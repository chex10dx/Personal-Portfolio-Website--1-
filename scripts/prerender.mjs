import { mkdtemp, mkdir, readFile, rmdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build, resolveConfig } from 'vite';

const config = await resolveConfig({}, 'build', 'production');
const outputDirectory = path.resolve(config.root, config.build.outDir);
const tempRoot = path.join(config.root, 'node_modules/.vite-temp');
await mkdir(tempRoot, { recursive: true });
const temp = await mkdtemp(path.join(tempRoot, 'portfolio-ssr-'));
const written = [];

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

try {
  const { output } = await build({
    configFile: false,
    root: config.root,
    mode: config.mode,
    base: config.base,
    envDir: config.envDir,
    publicDir: false,
    esbuild: { jsx: 'automatic' },
    build: {
      ssr: 'src/entry-server.tsx',
      write: false,
      rollupOptions: { output: { entryFileNames: '[name].mjs', chunkFileNames: '[name]-[hash].mjs' } },
    },
  });
  for (const entry of output) {
    if (entry.type !== 'chunk') continue;
    const target = path.join(temp, entry.fileName);
    await writeFile(target, entry.code);
    written.push(target);
  }
  const { renderPortfolio } = await import(pathToFileURL(path.join(temp, 'entry-server.mjs')));
  const template = await readFile(path.join(outputDirectory, 'index.html'), 'utf8');
  if (!template.includes('<!-- portfolio-seo:start -->') || !template.includes('<div id="root"></div>')) {
    throw new Error('The prerender markers are missing from the built index.html.');
  }

  for (const locale of ['en', 'ar']) {
    const { title, direction, metadata, markup } = await renderPortfolio(locale);
    const tags = metadata.map((attributes) => {
      const element = 'rel' in attributes ? 'link' : 'meta';
      const props = Object.entries(attributes).map(([key, value]) => `${key}="${escapeHtml(value)}"`).join(' ');
      return `<${element} data-portfolio-seo ${props}>`;
    });
    const html = template
      .replace(/<html[^>]*>/, `<html lang="${locale}" dir="${direction}">`)
      .replace(/<!-- portfolio-seo:start -->[\s\S]*?<!-- portfolio-seo:end -->/, () => [
        `<title>${escapeHtml(title)}</title>`, ...tags,
      ].join('\n      '))
      .replace('<div id="root"></div>', () => `<div id="root" data-locale="${locale}" data-portfolio-pending>${markup}</div>`);

    const folder = path.join(outputDirectory, locale);
    await mkdir(folder, { recursive: true });
    await writeFile(path.join(folder, 'index.html'), html);
    if (locale === 'en') await writeFile(path.join(outputDirectory, 'index.html'), html);
    console.log(`Prerendered ${config.base}${locale}/`);
  }
} finally {
  await Promise.all(written.map((file) => unlink(file)));
  await rmdir(temp);
}
