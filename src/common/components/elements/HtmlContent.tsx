import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface HtmlContentProps {
  content: string;
  className?: string;
}

const HtmlContent = ({ content, className = '' }: HtmlContentProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!content) return null;

  if (!mounted) {
    return (
      <div
        className={clsx(
          'prose max-w-none animate-pulse rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800',
          className,
        )}
        style={{ height: '200px' }}
      />
    );
  }

  const isDarkMode = resolvedTheme === 'dark';

  return (
    <div
      className={clsx(
        'prose prose-lg max-w-none',
        isDarkMode ? 'prose-invert' : 'prose-neutral',
        // Headings
        'prose-headings:font-bold prose-headings:tracking-tight',
        'prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-6 prose-h1:border-b prose-h1:border-neutral-200 prose-h1:pb-2 dark:prose-h1:border-neutral-700',
        'prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-6 prose-h2:font-semibold',
        'prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-4 prose-h3:font-semibold',
        'prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-4',
        // Paragraphs
        'prose-p:leading-relaxed prose-p:mb-4 prose-p:text-base',
        'prose-p:text-neutral-700 dark:prose-p:text-neutral-300',
        // Links
        'prose-a:font-medium prose-a:no-underline',
        'prose-a:text-blue-600 hover:prose-a:text-blue-700 hover:prose-a:underline',
        'dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300',
        // Strong/Bold
        'prose-strong:font-bold prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100',
        // Emphasis/Italic
        'prose-em:italic prose-em:text-neutral-800 dark:prose-em:text-neutral-200',
        // Code
        'prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono',
        'prose-code:bg-neutral-100 prose-code:text-neutral-800',
        'dark:prose-code:bg-neutral-800 dark:prose-code:text-neutral-200',
        // Code blocks
        'prose-pre:rounded-lg prose-pre:border prose-pre:border-neutral-200 prose-pre:bg-neutral-50 prose-pre:p-4',
        'dark:prose-pre:border-neutral-700 dark:prose-pre:bg-neutral-900',
        'prose-pre:overflow-x-auto',
        // Blockquotes
        'prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-neutral-50 prose-blockquote:pl-4 prose-blockquote:pr-4 prose-blockquote:py-2 prose-blockquote:my-4 prose-blockquote:rounded-r-lg',
        'prose-blockquote:italic prose-blockquote:text-neutral-700',
        'dark:prose-blockquote:bg-neutral-800 dark:prose-blockquote:border-blue-400 dark:prose-blockquote:text-neutral-300',
        // Images
        'prose-img:rounded-lg prose-img:shadow-md prose-img:my-6 prose-img:mx-auto prose-img:max-w-full prose-img:h-auto',
        // Lists
        'prose-ul:my-4 prose-ul:pl-6 prose-ul:list-disc prose-ul:space-y-2',
        'prose-ol:my-4 prose-ol:pl-6 prose-ol:list-decimal prose-ol:space-y-2',
        'prose-li:my-1 prose-li:leading-relaxed prose-li:pl-2',
        'prose-li:text-neutral-700 dark:prose-li:text-neutral-300',
        'prose-ul:prose-li:marker:text-neutral-500 dark:prose-ul:prose-li:marker:text-neutral-400',
        'prose-ol:prose-li:marker:text-neutral-500 dark:prose-ol:prose-li:marker:text-neutral-400',
        // Nested lists
        'prose-li:prose-ul:mt-2 prose-li:prose-ul:mb-2 prose-li:prose-ul:pl-6',
        'prose-li:prose-ol:mt-2 prose-li:prose-ol:mb-2 prose-li:prose-ol:pl-6',
        // Tables
        'prose-table:w-full prose-table:my-6 prose-table:border-collapse prose-table:overflow-x-auto',
        'prose-th:border prose-th:border-neutral-300 prose-th:bg-neutral-100 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-neutral-900',
        'dark:prose-th:border-neutral-700 dark:prose-th:bg-neutral-800 dark:prose-th:text-neutral-100',
        'prose-td:border prose-td:border-neutral-300 prose-td:px-4 prose-td:py-3 prose-td:text-neutral-700',
        'dark:prose-td:border-neutral-700 dark:prose-td:text-neutral-300',
        'prose-tr:hover:bg-neutral-50 dark:prose-tr:hover:bg-neutral-800/50',
        // Horizontal rules
        'prose-hr:my-8 prose-hr:border-neutral-200 dark:prose-hr:border-neutral-700',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default HtmlContent;
