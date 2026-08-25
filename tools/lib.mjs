/**
 * Utilitários compartilhados pelas ferramentas de desenvolvimento.
 * Nada aqui roda em produção — a Vercel só serve arquivos estáticos.
 */

import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');

/** Diretórios que nunca contêm páginas publicáveis. */
const IGNORED_DIRS = new Set(['.git', '.vercel', 'node_modules', 'partials', 'tools', 'docs']);

/** Percorre o repositório e devolve todo caminho .html publicável. */
export function findHtmlFiles(dir = ROOT, found = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (!IGNORED_DIRS.has(entry)) findHtmlFiles(full, found);
    } else if (entry.endsWith('.html')) {
      found.push(full);
    }
  }
  return found;
}
