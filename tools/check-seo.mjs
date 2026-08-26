#!/usr/bin/env node
/**
 * check-seo.mjs — cada página precisa de title, meta description e canonical
 * próprios e únicos. O Google recomenda títulos e descrições específicos por
 * URL; reaproveitar o mesmo par em várias páginas desperdiça o snippet.
 *
 *   node tools/check-seo.mjs
 */

import { readFileSync } from 'node:fs';
import { relative, sep } from 'node:path';
import { ROOT, findHtmlFiles } from './lib.mjs';

const BASE = 'https://guadalupesistemas.com.br';
const MAX_TITLE = 65;
const MAX_DESCRIPTION = 165;

const errors = [];
const warnings = [];
const seen = { title: new Map(), description: new Map(), canonical: new Map() };

function pick(html, re) {
  const m = html.match(re);
  return m ? m[1].replace(/\s+/g, ' ').trim() : null;
}

const files = findHtmlFiles();

for (const file of files) {
  const rel = relative(ROOT, file).split(sep).join('/');
  const html = readFileSync(file, 'utf8');

  const found = {
    title: pick(html, /<title>([\s\S]*?)<\/title>/i),
    description: pick(html, /<meta\s+name="description"\s+content="([^"]*)"/i),
    canonical: pick(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i)
  };

  for (const [field, value] of Object.entries(found)) {
    if (!value) {
      errors.push(`${rel}  —  ${field} ausente`);
      continue;
    }
    const previous = seen[field].get(value);
    if (previous) errors.push(`${rel}  —  ${field} duplicado (igual ao de ${previous})`);
    else seen[field].set(value, rel);
  }

  if (found.canonical && !found.canonical.startsWith(BASE)) {
    errors.push(`${rel}  —  canonical não aponta para ${BASE}: ${found.canonical}`);
  }
  if (found.title && found.title.length > MAX_TITLE) {
    warnings.push(`${rel}  —  title com ${found.title.length} caracteres (o Google trunca perto de ${MAX_TITLE})`);
  }
  if (found.description && found.description.length > MAX_DESCRIPTION) {
    warnings.push(`${rel}  —  description com ${found.description.length} caracteres (ideal até ${MAX_DESCRIPTION})`);
  }
  if (!/<html[^>]*\slang="pt-BR"/i.test(html)) {
    errors.push(`${rel}  —  <html lang="pt-BR"> ausente`);
  }
}

for (const w of warnings) console.warn(`  ! ${w}`);

if (errors.length) {
  console.error(`\n✗ ${errors.length} problema(s) de SEO em ${files.length} páginas:\n`);
  for (const e of errors) console.error(`    ${e}`);
  process.exit(1);
}

console.log(`✓ ${files.length} páginas com title, description e canonical únicos${warnings.length ? ` (${warnings.length} aviso(s))` : ''}`);
