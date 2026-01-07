import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const RichTextEditor = ({
  value,
  onChange,
  placeholder = 'Start writing...',
  className = '',
  disabled = false,
}: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstanceRef = useRef<any>(null);

  // Markdown shortcuts handler
  useEffect(() => {
    if (!editorRef.current || disabled) return;

    // Get Quill instance from DOM
    const getQuillInstance = () => {
      if (quillInstanceRef.current) return quillInstanceRef.current;

      const quillElement = editorRef.current?.querySelector('.quill');
      if (quillElement && (quillElement as any).__quill) {
        quillInstanceRef.current = (quillElement as any).__quill;
        return quillInstanceRef.current;
      }
      return null;
    };

    let handleTextChange:
      | ((delta: any, oldDelta: any, source: string) => void)
      | null = null;

    // Wait a bit for Quill to initialize
    const timeoutId = setTimeout(() => {
      const quill = getQuillInstance();
      if (!quill) return;

      handleTextChange = (delta: any, oldDelta: any, source: string) => {
        // Only process user input, not programmatic changes
        if (source !== 'user') return;

        const selection = quill.getSelection();
        if (!selection) return;

        const [line, offset] = quill.getLine(selection.index);
        const lineText = quill.getText(line, Infinity);
        const lineStart = quill.getIndex(line);

        // Handle markdown shortcuts at the start of line or after space
        const textBeforeCursor = lineText.substring(0, offset);

        // Headers: # ## ### etc. (triggered on space or enter)
        const headerMatch = textBeforeCursor.match(/^(#{1,6})\s+(.+)$/);
        if (
          headerMatch &&
          (delta.ops?.[0]?.insert === ' ' || delta.ops?.[0]?.insert === '\n')
        ) {
          const level = headerMatch[1].length;
          const text = headerMatch[2];
          quill.deleteText(lineStart, lineText.length);
          quill.insertText(lineStart, text, { header: level });
          quill.setSelection(lineStart + text.length);
          return;
        }

        // Bold: **text** or __text__ (triggered on space or enter)
        const boldMatch = textBeforeCursor.match(/(\*\*|__)(.+?)\1$/);
        if (
          boldMatch &&
          (delta.ops?.[0]?.insert === ' ' || delta.ops?.[0]?.insert === '\n')
        ) {
          const text = boldMatch[2];
          const start = selection.index - boldMatch[0].length;
          quill.deleteText(start, boldMatch[0].length);
          quill.insertText(start, text, 'bold');
          quill.setSelection(start + text.length);
          return;
        }

        // Italic: *text* or _text_ (triggered on space or enter)
        const italicMatch = textBeforeCursor.match(
          /(?<!\*)\*([^*\n]+?)\*(?!\*)$|(?<!_)_([^_\n]+?)_(?!_)$/,
        );
        if (
          italicMatch &&
          (delta.ops?.[0]?.insert === ' ' || delta.ops?.[0]?.insert === '\n')
        ) {
          const text = italicMatch[1] || italicMatch[2];
          const matchText = italicMatch[0];
          const start = selection.index - matchText.length;
          quill.deleteText(start, matchText.length);
          quill.insertText(start, text, 'italic');
          quill.setSelection(start + text.length);
          return;
        }

        // Code: `text` (triggered on space or enter)
        const codeMatch = textBeforeCursor.match(/`([^`]+?)`$/);
        if (
          codeMatch &&
          (delta.ops?.[0]?.insert === ' ' || delta.ops?.[0]?.insert === '\n')
        ) {
          const text = codeMatch[1];
          const start = selection.index - codeMatch[0].length;
          quill.deleteText(start, codeMatch[0].length);
          quill.insertText(start, text, 'code');
          quill.setSelection(start + text.length);
          return;
        }

        // Blockquote: > text (triggered on space or enter)
        const blockquoteMatch = textBeforeCursor.match(/^>\s+(.+)$/);
        if (
          blockquoteMatch &&
          (delta.ops?.[0]?.insert === ' ' || delta.ops?.[0]?.insert === '\n')
        ) {
          const text = blockquoteMatch[1];
          quill.deleteText(lineStart, lineText.length);
          quill.insertText(lineStart, text, 'blockquote');
          quill.setSelection(lineStart + text.length);
          return;
        }

        // Unordered list: - or * (triggered on space)
        const ulMatch = textBeforeCursor.match(/^[-*]\s+(.+)$/);
        if (ulMatch && delta.ops?.[0]?.insert === ' ') {
          const text = ulMatch[1];
          quill.deleteText(lineStart, lineText.length);
          quill.insertText(lineStart, text);
          quill.formatLine(
            lineStart,
            lineStart + text.length,
            'list',
            'bullet',
          );
          quill.setSelection(lineStart + text.length);
          return;
        }

        // Ordered list: 1. 2. etc. (triggered on space)
        const olMatch = textBeforeCursor.match(/^\d+\.\s+(.+)$/);
        if (olMatch && delta.ops?.[0]?.insert === ' ') {
          const text = olMatch[1];
          quill.deleteText(lineStart, lineText.length);
          quill.insertText(lineStart, text);
          quill.formatLine(
            lineStart,
            lineStart + text.length,
            'list',
            'ordered',
          );
          quill.setSelection(lineStart + text.length);
          return;
        }
      };

      // Listen to text-change events
      quill.on('text-change', handleTextChange);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (quillInstanceRef.current && handleTextChange) {
        quillInstanceRef.current.off('text-change', handleTextChange);
      }
    };
  }, [disabled, value]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'color',
    'background',
    'align',
  ];

  const handleChange = (content: string) => {
    onChange(content);
  };

  return (
    <div ref={editorRef} className={`rich-text-editor ${className}`}>
      <div className='mb-2 rounded-lg border border-neutral-200 bg-neutral-50 p-2 text-xs text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'>
        <span className='font-semibold'>Markdown shortcuts:</span>{' '}
        <span className='font-mono'>**bold**</span>,{' '}
        <span className='font-mono'>*italic*</span>,{' '}
        <span className='font-mono'># heading</span>,{' '}
        <span className='font-mono'>- list</span>,{' '}
        <span className='font-mono'>`code`</span>,{' '}
        <span className='font-mono'>&gt; quote</span>
      </div>
      <ReactQuill
        theme='snow'
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={disabled}
        className='bg-white dark:bg-neutral-800'
      />
      <style jsx global>{`
        .rich-text-editor .quill {
          background: white;
        }
        .dark .rich-text-editor .quill {
          background: #1a1a1a;
        }
        .rich-text-editor .ql-container {
          font-size: 14px;
          min-height: 200px;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          border-color: rgb(212 212 212);
        }
        .dark .rich-text-editor .ql-container {
          border-color: rgb(64 64 64);
          background: #1a1a1a;
          color: #e5e5e5;
        }
        .rich-text-editor .ql-editor {
          min-height: 200px;
          color: #262626;
        }
        .dark .rich-text-editor .ql-editor {
          color: #e5e5e5;
        }
        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          border-color: rgb(212 212 212);
          background: #fafafa;
        }
        .dark .rich-text-editor .ql-toolbar {
          border-color: rgb(64 64 64);
          background: #262626;
        }
        .dark .rich-text-editor .ql-toolbar .ql-stroke {
          stroke: #e5e5e5;
        }
        .dark .rich-text-editor .ql-toolbar .ql-fill {
          fill: #e5e5e5;
        }
        .dark .rich-text-editor .ql-toolbar .ql-picker-label {
          color: #e5e5e5;
        }
        .rich-text-editor .ql-toolbar button:hover,
        .rich-text-editor .ql-toolbar button.ql-active {
          color: #3b82f6;
        }
        .dark .rich-text-editor .ql-toolbar button:hover,
        .dark .rich-text-editor .ql-toolbar button.ql-active {
          color: #60a5fa;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
