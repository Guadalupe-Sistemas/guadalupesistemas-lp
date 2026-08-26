#!/usr/bin/env node
/**
 * check-links.mjs — garante que todo link interno resolve para um arquivo real.
 *
 * Existe por causa do defeito nº 1 da auditoria de 25/08/2026: os três cards de
 * "Leitura Rápida" apontavam para href="#" e o clique não fazia absolutamente nada.
 * Este script falha o build local antes que isso volte a acontecer.
 *
 *   node tools/check-links.mjs
 *
 * Regras:
 *   - href="/algo/"        → precisa existir algo/index.html
 *   - href="/algo.html"    → precisa existir o arquivo
 *   - href="#id"           → o id precisa existir na mesma página
 *   - href="/algo/#id"     → só a página é verificada
 *   - href="#" ou vazio    → erro (link morto)
 *   - http(s):, mailto:, tel: → ignorados
 */

import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { ROOT, findHtmlFiles } from './lib.mjs';

const EXTERNAL = /^(https?:|mailto:|tel:|javascript:|data:)/i;

const errors = [];
let checked = 0;

for (const file of findHtmlFiles()) {
  const rel = relative(ROOT, file).split(sep).join('/');
  const html = readFileSync(file, 'utf8');

  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  const report = (href, why) => errors.push(`${rel}  →  ${href || '(vazio)'}  —  ${why}`);

  for (const match of html.matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)) {
    const href = match[1];
    checked++;

    if (EXTERNAL.test(href)) continue;

    if (href === '' || href === '#') {
      report(href, 'link morto — aponta para lugar nenhum');
      continue;
    }

    const [path, hash] = href.split('#');

    if (path === '') {
      if (!ids.has(hash)) report(href, `âncora #${hash} não existe nesta página`);
      continue;
    }

    if (!path.startsWith('/')) {
      report(href, 'use caminho absoluto a partir da raiz (/...) — relativo quebra em subpastas');
      continue;
    }

    const target = path.endsWith('/')
      ? join(ROOT, path, 'index.html')
      : join(ROOT, path);

    if (!existsSync(target)) {
      report(href, `arquivo não encontrado: ${relative(ROOT, target).split(sep).join('/')}`);
      continue;
    }

    if (statSync(target).isDirectory()) {
      report(href, 'aponta para um diretório sem barra final');
    }
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} link(s) interno(s) quebrado(s) de ${checked} verificados:\n`);
  for (const e of errors) console.error(`    ${e}`);
  process.exit(1);
}

console.log(`✓ ${checked} links verificados, nenhum quebrado`);
