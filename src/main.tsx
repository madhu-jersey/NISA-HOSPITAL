import {
  createRoot,
  hydrateRoot,
  type RootOptions,
} from 'react-dom/client';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';

import './index.css';

const rootElement = document.getElementById('root')!;
const app = (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
const rootOptions: RootOptions = {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
};

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app, rootOptions);
} else {
  createRoot(rootElement, rootOptions).render(app);
}
