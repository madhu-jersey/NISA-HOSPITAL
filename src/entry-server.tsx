import { renderToString } from 'react-dom/server';
import { ErrorBoundary } from '@/components/error-boundary';
import App from './App';

export function render(url: string): string {
  return renderToString(
    <ErrorBoundary>
      <App ssrPath={url} />
    </ErrorBoundary>,
  );
}
