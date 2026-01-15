/* eslint-disable unused-imports/no-unused-vars */
import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import CodeBlock from './CodeBlock';

interface MarkdownRendererProps {
  children: string;
}

interface TableProps {
  children: ReactNode;
}

const Table = ({ children }: TableProps) => (
  <div className='my-6 overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700'>
    <table className='w-full border-collapse'>{children}</table>
  </div>
);

const MDXComponent = ({ children }: MarkdownRendererProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: (props) => (
          <a
            className='cursor-pointer text-teal-500 hover:text-teal-400 hover:underline'
            {...props}
          />
        ),
        p: (props) => (
          <p
            className='my-4 leading-relaxed text-neutral-700 dark:text-neutral-300'
            {...props}
          />
        ),
        h2: (props) => (
          <h2
            className='text-xl font-medium dark:text-neutral-300'
            {...props}
          />
        ),
        h3: (props) => (
          <h3
            className='pt-4 text-[18px] font-medium leading-snug dark:text-neutral-300'
            {...props}
          />
        ),
        ul: ({ ordered, ...props }) => (
          <ul
            className='my-4 list-disc space-y-2 pl-6 text-neutral-700 dark:text-neutral-300'
            {...props}
          />
        ),
        ol: ({ ordered, ...props }) => (
          <ol
            className='my-4 list-decimal space-y-2 pl-6 text-neutral-700 dark:text-neutral-300'
            {...props}
          />
        ),
        li: (props) => <li className='my-1 pl-2 leading-relaxed' {...props} />,
        code: (props) => <CodeBlock {...props} />,
        blockquote: (props) => (
          <blockquote
            className='rounded-br-2xl border-l-[5px] border-neutral-700 border-l-cyan-500 bg-neutral-200 py-3 pl-6  text-lg font-medium text-cyan-800 dark:bg-neutral-800 dark:text-cyan-200'
            {...props}
          />
        ),
        table: (props) => <Table {...props} />,
        th: (props) => (
          <th className='border border-neutral-300 bg-neutral-100 px-4 py-3 text-left font-semibold text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100'>
            {props.children}
          </th>
        ),
        td: (props) => (
          <td className='border border-neutral-300 px-4 py-3 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300'>
            {props.children}
          </td>
        ),
        tr: (props) => (
          <tr
            className='hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
            {...props}
          />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default MDXComponent;
