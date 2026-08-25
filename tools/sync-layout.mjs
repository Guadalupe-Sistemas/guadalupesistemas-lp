#!/usr/bin/env node
/**
 * sync-layout.mjs — propaga partials/nav.html e partials/footer.html para todas as páginas.
 *
 * Ferramenta de desenvolvimento: roda na sua máquina antes do commit.
 * O deploy continua 100% estático — a Vercel nunca executa este arquivo.
 *
 *   node tools/sync-layout.mjs           escreve
 *   node tools/sync-layout.mjs --check   só verifica; sai com código 1 se houver divergência
 *
 * Cada página delimita os blocos assim:
 *
 *   <!-- gs:nav:start variant="solid" active="solucoes" -->
 *   ...html gerado...
 *   <!-- gs:nav:end -->
 *
 *   <!-- gs:footer:start -->
 *   ...html gerado...
 *   <!-- gs:footer:end -->
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { ROOT, findHtmlFiles } from './lib.mjs';

const CHECK_ONLY = process.argv.includes('--check');

/** Remove o comentário de documentação do topo do partial. */
function loadPartial(name) {
  const raw = readFileSync(join(ROOT, 'partials', `${name}.html`), 'utf8');
  return raw.replace(/^\s*<!--[\s\S]*?-->\s*/, '').trimEnd();
}

/** Lê os atributos declarados no marcador de abertura. */
function parseMarkerAttrs(marker) {
  const attrs = {};
  for (const m of marker.matchAll(/(\w+)="([^"]*)"/g)) attrs[m[1]] = m[2];
  return attrs;
}

/** Aplica variant/active e reindenta o partial para a posição do marcador. */
function render(partial, attrs, indent) {
  let html = partial;

  const extra = attrs.variant === 'solid' ? ' navbar-solid' : '';
  html = html.replaceAll('{{NAV_EXTRA_CLASS}}', extra);

  if (attrs.active) {
    // <a href="..." data-nav="solucoes"> → <a href="..." class="active" data-nav="solucoes">
    html = html.replace(
      new RegExp(`(<a\\s[^>]*?)(data-nav="${attrs.active}")`),
      '$1class="active" $2'
    );
  }

  return html
    .split('\n')
    .map(line => (line.trim() === '' ? '' : indent + line))
    .join('\n');
}

const partials = { nav: loadPartial('nav'), footer: loadPartial('footer') };

const drifted = [];
let written = 0;
let blocksSeen = 0;

for (const file of findHtmlFiles()) {
  const original = readFileSync(file, 'utf8');
  let updated = original;

  for (const [name, partial] of Object.entries(partials)) {
    const block = new RegExp(
      `([ \\t]*)(<!--\\s*gs:${name}:start\\b[^>]*-->)[\\s\\S]*?(<!--\\s*gs:${name}:end\\s*-->)`,
      'g'
    );

    updated = updated.replace(block, (_match, indent, startMarker, endMarker) => {
      blocksSeen++;
      const body = render(partial, parseMarkerAttrs(startMarker), indent);
      return `${indent}${startMarker}\n${body}\n${indent}${endMarker}`;
    });
  }

  if (updated === original) continue;

  const rel = relative(ROOT, file).split(sep).join('/');
  drifted.push(rel);
  if (!CHECK_ONLY) {
    writeFileSync(file, updated, 'utf8');
    written++;
  }
}

if (CHECK_ONLY) {
  if (drifted.length) {
    console.error(`✗ nav/footer fora de sincronia em ${drifted.length} arquivo(s):`);
    for (const f of drifted) console.error(`    ${f}`);
    console.error('\n  Rode: node tools/sync-layout.mjs');
    process.exit(1);
  }
  console.log(`✓ nav/footer em sincronia (${blocksSeen} blocos verificados)`);
} else {
  console.log(`✓ ${blocksSeen} blocos processados, ${written} arquivo(s) atualizado(s)`);
}
