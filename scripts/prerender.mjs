import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const htmlPath = path.join(projectRoot, 'dist', 'index.html');
const vite = await createServer({
  configFile: path.join(projectRoot, 'vite.config.ts'),
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true },
});

try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
  let renderedHtml;

  try {
    renderedHtml = render('/');
  } catch (error) {
    throw new Error('Failed to render the home route during prerendering.', {
      cause: error,
    });
  }

  const html = await readFile(htmlPath, 'utf8');
  const rootElement = /(<div\s+id=["']root["']\s*>)(\s*)(<\/div>)/;
  if (!rootElement.test(html)) {
    throw new Error(`Could not find an empty root element in ${htmlPath}.`);
  }

  await writeFile(
    htmlPath,
    html.replace(rootElement, (_match, openingTag, _whitespace, closingTag) =>
      `${openingTag}${renderedHtml}${closingTag}`,
    ),
    'utf8',
  );
} finally {
  await vite.close();
}
