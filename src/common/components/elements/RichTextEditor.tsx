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

  return (
    <div className={`rich-text-editor ${className}`}>
      <ReactQuill
        theme='snow'
        value={value}
        onChange={onChange}
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
