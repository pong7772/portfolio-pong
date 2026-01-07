import { useEffect, useRef } from 'react';

interface HtmlContentProps {
  content: string;
  className?: string;
}

const HtmlContent = ({ content, className = '' }: HtmlContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && content) {
      // Apply custom styles to HTML content
      const style = document.createElement('style');
      style.textContent = `
        .html-content {
          line-height: 1.8;
          color: inherit;
        }
        .html-content h1,
        .html-content h2,
        .html-content h3,
        .html-content h4,
        .html-content h5,
        .html-content h6 {
          font-weight: 700;
          margin-top: 1.5em;
          margin-bottom: 0.75em;
          line-height: 1.3;
        }
        .html-content h1 {
          font-size: 2em;
        }
        .html-content h2 {
          font-size: 1.75em;
        }
        .html-content h3 {
          font-size: 1.5em;
        }
        .html-content h4 {
          font-size: 1.25em;
        }
        .html-content h5 {
          font-size: 1.1em;
        }
        .html-content h6 {
          font-size: 1em;
        }
        .html-content p {
          margin-bottom: 1em;
        }
        .html-content ul,
        .html-content ol {
          margin: 1em 0;
          padding-left: 2em;
        }
        .html-content li {
          margin: 0.5em 0;
        }
        .html-content a {
          color: rgb(59 130 246);
          text-decoration: underline;
          transition: color 0.2s;
        }
        .html-content a:hover {
          color: rgb(37 99 235);
        }
        .dark .html-content a {
          color: rgb(96 165 250);
        }
        .dark .html-content a:hover {
          color: rgb(147 197 253);
        }
        .html-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1.5em 0;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
        .html-content blockquote {
          border-left: 4px solid rgb(212 212 212);
          padding-left: 1em;
          margin: 1.5em 0;
          font-style: italic;
          color: rgb(115 115 115);
        }
        .dark .html-content blockquote {
          border-left-color: rgb(64 64 64);
          color: rgb(163 163 163);
        }
        .html-content code {
          background-color: rgb(243 244 246);
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-size: 0.9em;
          font-family: 'Fira Code', monospace;
        }
        .dark .html-content code {
          background-color: rgb(38 38 38);
        }
        .html-content pre {
          background-color: rgb(243 244 246);
          padding: 1em;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1.5em 0;
        }
        .dark .html-content pre {
          background-color: rgb(23 23 23);
        }
        .html-content pre code {
          background-color: transparent;
          padding: 0;
        }
        .html-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5em 0;
        }
        .html-content table th,
        .html-content table td {
          border: 1px solid rgb(212 212 212);
          padding: 0.75em;
          text-align: left;
        }
        .dark .html-content table th,
        .dark .html-content table td {
          border-color: rgb(64 64 64);
        }
        .html-content table th {
          background-color: rgb(243 244 246);
          font-weight: 600;
        }
        .dark .html-content table th {
          background-color: rgb(38 38 38);
        }
        .html-content hr {
          border: none;
          border-top: 1px solid rgb(212 212 212);
          margin: 2em 0;
        }
        .dark .html-content hr {
          border-top-color: rgb(64 64 64);
        }
        .html-content iframe,
        .html-content video {
          max-width: 100%;
          border-radius: 8px;
          margin: 1.5em 0;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, [content]);

  if (!content) {
    return null;
  }

  return (
    <div
      ref={contentRef}
      className={`html-content ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default HtmlContent;
