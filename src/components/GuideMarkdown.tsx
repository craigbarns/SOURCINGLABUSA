import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/** Tables stay in the server-rendered HTML and scroll within narrow screens. */
export function GuideMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        table: ({ children }) => (
          <div className="guide-table-scroll" role="region" aria-label="Comparison table" tabIndex={0}>
            <table>{children}</table>
          </div>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
