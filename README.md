<div align="center">
  <img src="assets/logo-completa.png" alt="Guadalupe Sistemas" width="320">

  <p><strong>IA, automação e sistemas sob medida para clínicas, engenharia e empresas de serviços.</strong></p>

  <p>
    <a href="https://guadalupesistemas.com.br"><img src="https://img.shields.io/badge/site-guadalupesistemas.com.br-6B4EE8" alt="Site"></a>
    <img src="https://img.shields.io/badge/deploy-Vercel-000000" alt="Vercel">
    <img src="https://img.shields.io/badge/stack-HTML%20%C2%B7%20CSS%20%C2%B7%20JS-informational" alt="Stack">
  </p>
</div>

---

## 📌 Sobre

Site institucional e de aquisição da Guadalupe Sistemas. **100% estático**: sem
build step, sem dependência de Node em produção. A Vercel serve os arquivos
exatamente como estão no repositório.

Node é usado apenas por ferramentas de desenvolvimento (`tools/`), que rodam na
sua máquina antes do commit e nunca no deploy.

## 🗂 Estrutura

```
.
├── index.html                      home
├── solucoes/                       hub + 5 páginas de solução
│   ├── agentes-de-ia/
│   ├── automacao-de-processos/
│   ├── assistente-de-conhecimento/
│   ├── sistemas-sob-medida/
│   └── aplicativos/
├── para-clinicas/                  vertical saúde
├── para-engenharia/                vertical engenharia e arquitetura
├── diagnostico-de-ia/              oferta de entrada
├── casos/                          hub + 3 casos
├── sobre/  contato/  seguranca-e-lgpd/  politica-de-privacidade/
├── blog/                           índice + 5 artigos
│
├── css/styles.css                  design system completo (28 seções)
├── js/
│   ├── script.js                   interações da página
│   ├── analytics.js                camada de eventos (dataLayer + GA4)
│   └── cookie-consent.js           banner LGPD + Consent Mode v2
├── assets/                         logos e imagem de compartilhamento
│
├── partials/                       ← FONTE ÚNICA de nav e footer
│   ├── nav.html
│   ├── footer.html
│   └── page-template.html          molde para páginas novas
├── tools/                          ferramentas de desenvolvimento (Node)
├── docs/analytics.md               como a medição funciona
│
├── vercel.json                     301 das URLs antigas, headers, cache
├── .vercelignore                   tira partials/ tools/ docs/ do deploy
├── sitemap.xml  robots.txt  llms.txt  site.webmanifest
```

## ⚠️ Antes de editar nav ou footer

**Não edite o `<nav>` ou o `<footer>` dentro das páginas.** Eles são gerados a
partir de `partials/` e qualquer alteração direta é sobrescrita.

```bash
# 1. edite partials/nav.html ou partials/footer.html
# 2. propague para as 24 páginas
node tools/sync-layout.mjs
```

Cada página delimita os blocos assim:

```html
<!-- gs:nav:start variant="solid" active="solucoes" -->
   ...gerado...
<!-- gs:nav:end -->
```

`variant="solid"` deixa a navbar opaca (todas as páginas menos a home).
`active="..."` acende o item do menu.

## ✅ Verificadores

Rode os três antes de qualquer commit:

```bash
node tools/sync-layout.mjs --check   # nav/footer em sincronia com partials/
node tools/check-links.mjs          # todo href interno resolve para um arquivo real
node tools/check-seo.mjs            # title, description e canonical presentes e únicos
node tools/check-quality.mjs        # H1 único, FAQ x JSON-LD, alt, rel=noopener
node tools/build-sitemap.mjs        # regenera sitemap.xml a partir da árvore
```

`check-links.mjs` existe por um motivo específico: em agosto de 2026 os três
cards de artigos da home apontavam para `href="#"` e o clique não fazia nada.
O script falha se isso voltar a acontecer.

## 🚀 Rodando localmente

Como as páginas usam caminhos absolutos (`/css/styles.css`), é preciso um
servidor — abrir o arquivo direto no navegador não funciona.

```bash
python -m http.server 5500
# ou
npx serve .
```

Depois acesse <http://localhost:5500>.

## 🛠 Stack

HTML5 semântico, CSS3 puro (sem framework) e JavaScript sem dependências.
Fontes Sora e Inter via Google Fonts; ícones do Font Awesome 6 com carregamento
adiado. Deploy automático na Vercel a partir da branch `main`.

## 🔎 SEO e medição

- `title`, `meta description` e `canonical` próprios em cada uma das 24 páginas
- JSON-LD: `Organization`, `WebSite`, `BreadcrumbList`, `Service`, `Article`,
  `FAQPage`, `Blog`, `AboutPage`, `ContactPage`
- `sitemap.xml` gerado a partir da árvore de arquivos
- `llms.txt` para mecanismos de resposta baseados em IA
- GA4 com Consent Mode v2 e camada de eventos própria — ver
  [`docs/analytics.md`](docs/analytics.md)

## 📄 Licença

Projeto proprietário da Guadalupe Sistemas.
