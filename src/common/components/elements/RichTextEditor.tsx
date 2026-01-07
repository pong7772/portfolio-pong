'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  height?: string;
}

const RichTextEditor = ({
  value,
  onChange,
  placeholder = 'Write your content here...',
  className = '',
  height = '400px',
}: RichTextEditorProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Custom toolbar with image and link support
  const modules = {
    toolbar: {
      container: [
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
      handlers: {
        image: function () {
          const url = prompt('Enter image URL:');
          if (url) {
            const quill = (this as any).quill;
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'image', url);
          }
        },
      },
    },
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

  if (!mounted) {
    return (
      <div
        className={`rounded-lg border border-neutral-300 bg-white p-4 dark:border-neutral-600 dark:bg-neutral-800 ${className}`}
        style={{ height }}
      >
        <div className='flex h-full items-center justify-center text-neutral-500'>
          Loading editor...
        </div>
      </div>
    );
  }

  return (
    <div className={`rich-text-editor ${className}`}>
      <style jsx global>{`
        .rich-text-editor .ql-container {
          font-size: 14px;
          font-family: inherit;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          border-color: rgb(212 212 212);
          background: white;
        }
        .dark .rich-text-editor .ql-container {
          border-color: rgb(38 38 38);
          background: rgb(23 23 23);
          color: rgb(229 229 229);
        }
        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          border-color: rgb(212 212 212);
          background: rgb(250 250 250);
        }
        .dark .rich-text-editor .ql-toolbar {
          border-color: rgb(38 38 38);
          background: rgb(38 38 38);
        }
        .rich-text-editor .ql-toolbar .ql-stroke {
          stroke: rgb(64 64 64);
        }
        .dark .rich-text-editor .ql-toolbar .ql-stroke {
          stroke: rgb(212 212 212);
        }
        .rich-text-editor .ql-toolbar .ql-fill {
          fill: rgb(64 64 64);
        }
        .dark .rich-text-editor .ql-toolbar .ql-fill {
          fill: rgb(212 212 212);
        }
        .rich-text-editor .ql-toolbar button:hover,
        .rich-text-editor .ql-toolbar button.ql-active {
          color: rgb(59 130 246);
        }
        .dark .rich-text-editor .ql-toolbar button:hover,
        .dark .rich-text-editor .ql-toolbar button.ql-active {
          color: rgb(96 165 250);
        }
        .rich-text-editor .ql-editor {
          min-height: ${height};
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: rgb(163 163 163);
          font-style: normal;
        }
        .dark .rich-text-editor .ql-editor.ql-blank::before {
          color: rgb(115 115 115);
        }
        .rich-text-editor .ql-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 10px 0;
        }
        .rich-text-editor .ql-editor a {
          color: rgb(59 130 246);
          text-decoration: underline;
        }
        .dark .rich-text-editor .ql-editor a {
          color: rgb(96 165 250);
        }
      `}</style>
      <ReactQuill
        theme='snow'
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ height: 'auto' }}
      />
    </div>
  );
};

export default RichTextEditor;
