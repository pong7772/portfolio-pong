import clsx from 'clsx';

interface HtmlContentProps {
  content: string;
  className?: string;
}

const HtmlContent = ({ content, className = '' }: HtmlContentProps) => {
  if (!content) return null;

  return (
    <div
      className={clsx(
        'prose prose-neutral dark:prose-invert max-w-none',
        'prose-headings:font-semibold prose-headings:text-neutral-800 dark:prose-headings:text-neutral-200',
        'prose-p:text-neutral-700 dark:prose-p:text-neutral-300',
        'prose-a:text-blue-600 hover:prose-a:text-blue-700 dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300',
        'prose-strong:text-neutral-800 dark:prose-strong:text-neutral-200',
        'prose-code:text-neutral-800 dark:prose-code:text-neutral-200',
        'prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-800',
        'prose-blockquote:border-l-blue-500 prose-blockquote:bg-neutral-100 dark:prose-blockquote:bg-neutral-800',
        'prose-img:rounded-lg',
        'prose-ul:list-disc prose-ol:list-decimal',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default HtmlContent;
