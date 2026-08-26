#!/usr/bin/env node
/**
 * build-sitemap.mjs — gera sitemap.xml a partir das páginas que existem no disco.
 *
 * Com 23 páginas, manter o XML à mão significa mais cedo ou mais tarde publicar
 * um sitemap com URL que não existe ou sem uma página nova. Aqui ele é derivado.
 *
 *   node tools/build-sitemap.mjs            escreve sitemap.xml
 *   node tools/build-sitemap.mjs --check    só compara; sai com 1 se divergir
 *
 * Prioridade e frequência saem do tipo da página, não de um chute por URL.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { ROOT, findHtmlFiles } from './lib.mjs';

const BASE = 'https://guadalupesistemas.com.br';
const CHECK_ONLY = process.argv.includes('--check');
const TODAY = new Date().toISOString().slice(0, 10);

/** Converte o caminho do arquivo na URL pública correspondente. */
function toUrl(file) {
  const rel = relative(ROOT, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'index.html'.length);
  return '/' + rel;
}

/** Páginas comerciais valem mais que institucionais; artigos mudam menos. */
function rank(url) {
  if (url === '/') return { priority: '1.0', changefreq: 'weekly' };
  if (url === '/diagnostico-de-ia/') return { priority: '0.9', changefreq: 'monthly' };
  if (url === '/para-clinicas/' || url === '/para-engenharia/') {
    return { priority: '0.9', changefreq: 'monthly' };
  }
  if (url.startsWith('/solucoes/')) return { priority: '0.8', changefreq: 'monthly' };
  if (url === '/blog/') return { priority: '0.8', changefreq: 'weekly' };
  if (url.startsWith('/casos/')) return { priority: '0.7', changefreq: 'monthly' };
  if (url.startsWith('/blog/')) return { priority: '0.6', changefreq: 'monthly' };
  if (url === '/politica-de-privacidade/') return { priority: '0.3', changefreq: 'yearly' };
  return { priority: '0.5', changefreq: 'monthly' };
}

/** Uma página com noindex não entra no sitemap. */
function isIndexable(file) {
  const html = readFileSync(file, 'utf8');
  return !/<meta\s+name="robots"[^>]*content="[^"]*noindex/i.test(html);
}

const urls = findHtmlFiles()
  .filter(isIndexable)
  .map(toUrl)
  .sort((a, b) => {
    const byPriority = Number(rank(b).priority) - Number(rank(a).priority);
    return byPriority !== 0 ? byPriority : a.localeCompare(b);
  });

const body = urls
  .map(url => {
    const { priority, changefreq } = rank(url);
    return [
      '    <url>',
      `        <loc>${BASE}${url}</loc>`,
      `        <lastmod>${TODAY}</lastmod>`,
      `        <changefreq>${changefreq}</changefreq>`,
      `        <priority>${priority}</priority>`,
      '    </url>'
    ].join('\n');
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

const target = join(ROOT, 'sitemap.xml');

if (CHECK_ONLY) {
  const current = existsSync(target) ? readFileSync(target, 'utf8') : '';
  // lastmod muda todo dia; comparamos só o conjunto de URLs.
  const listed = new Set([...current.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));
  const expected = new Set(urls.map(u => BASE + u));

  const missing = [...expected].filter(u => !listed.has(u));
  const extra = [...listed].filter(u => !expected.has(u));

  if (missing.length || extra.length) {
    if (missing.length) console.error(`✗ ${missing.length} página(s) fora do sitemap:`);
    for (const u of missing) console.error(`    faltando: ${u}`);
    for (const u of extra) console.error(`    sobrando: ${u}`);
    console.error('\n  Rode: node tools/build-sitemap.mjs');
    process.exit(1);
  }
  console.log(`✓ sitemap.xml cobre as ${urls.length} páginas`);
} else {
  writeFileSync(target, xml, 'utf8');
  console.log(`✓ sitemap.xml gerado com ${urls.length} URLs`);
}
