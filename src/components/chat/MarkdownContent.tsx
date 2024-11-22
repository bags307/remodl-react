import ReactMarkdown from 'react-markdown';
import { CodeBlock } from './CodeBlock';

interface MarkdownContentProps {
  children: string;
}

export function MarkdownContent({ children }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      components={{
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <CodeBlock
              language={match[1]}
              value={String(children).replace(/\n$/, '')}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        // Add custom components for other markdown elements
        p: ({ children }) => (
          <p className="text-sm leading-relaxed">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-4 my-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-4 my-2">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-sm my-1">{children}</li>
        ),
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold my-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-semibold my-3">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-medium my-2">{children}</h3>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}