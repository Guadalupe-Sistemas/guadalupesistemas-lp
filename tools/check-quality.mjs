#!/usr/bin/env node
/**
 * check-quality.mjs — quatro defeitos que passam despercebidos em revisão manual
 * e custam caro depois:
 *
 *   1. página com zero ou mais de um <h1>
 *   2. FAQPage no JSON-LD divergente da FAQ visível — o Google trata
 *      dado estruturado que não corresponde ao conteúdo como violação
 *   3. <img> sem alt
 *   4. target="_blank" sem rel="noopener" — a página aberta ganha acesso
 *      ao window.opener da sua
 *
 *   node tools/check-quality.mjs
 */

import { readFileSync } from 'node:fs';
import { relative, sep } from 'node:path';
import { ROOT, findHtmlFiles } from './lib.mjs';

const strip = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
  .replace(/&mdash;/g, '—').replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();

const problems = [];

for (const file of findHtmlFiles()) {
  const rel = relative(ROOT, file).split(sep).join('/');
  const html = readFileSync(file, 'utf8');

  /* --- exatamente um H1 por página ------------------------------------- */
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  if (h1s.length !== 1) problems.push(`${rel} — ${h1s.length} elementos H1 (esperado 1)`);

  /* --- FAQPage precisa bater com a FAQ visível -------------------------- */
  const faqLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map(m => { try { return JSON.parse(m[1]); } catch { return null; } })
    .find(o => o && o['@type'] === 'FAQPage');

  const visibleQs = [...html.matchAll(/<button class="faq-question"[^>]*>\s*<span>([\s\S]*?)<\/span>/g)]
    .map(m => strip(m[1]));

  if (faqLd) {
    const ldQs = (faqLd.mainEntity || []).map(q => strip(q.name));
    if (!visibleQs.length) {
      problems.push(`${rel} — tem FAQPage no JSON-LD mas nenhuma FAQ visível`);
    } else {
      for (const q of ldQs) {
        if (!visibleQs.some(v => v === q)) {
          problems.push(`${rel} — pergunta do JSON-LD sem correspondente visível: "${q.slice(0, 70)}"`);
        }
      }
      if (ldQs.length !== visibleQs.length) {
        problems.push(`${rel} — FAQ: ${ldQs.length} no JSON-LD vs ${visibleQs.length} visíveis`);
      }
    }
  } else if (visibleQs.length) {
    problems.push(`${rel} — tem ${visibleQs.length} perguntas visíveis mas nenhum FAQPage no JSON-LD`);
  }

  /* --- imagens sem alt --------------------------------------------------- */
  for (const img of html.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/g)) {
    problems.push(`${rel} — <img> sem atributo alt: ${img[0].slice(0, 80)}`);
  }

  /* --- target=_blank sem rel -------------------------------------------- */
  for (const a of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    if (!/\brel=/.test(a[0])) problems.push(`${rel} — target="_blank" sem rel: ${a[0].slice(0, 90)}`);
  }
}

if (problems.length) {
  console.log(`${problems.length} ponto(s) de atenção:\n`);
  problems.forEach(p => console.log('  · ' + p));
  process.exit(1);
} else {
  console.log('✓ nenhum problema de qualidade encontrado');
}
