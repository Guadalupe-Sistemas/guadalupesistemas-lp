<div align="center">

<img src="assets/logo-completa.png" alt="Guadalupe Sistemas" width="320">

### IA, automação e sistemas sob medida para empresas

[![Site](https://img.shields.io/badge/site-guadalupesistemas.com.br-1e3a8a?style=for-the-badge)](https://guadalupesistemas.com.br/)
[![Deploy](https://img.shields.io/badge/deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-f7df1e?style=for-the-badge)](#-stack)

</div>

---

## 📌 Sobre

Site institucional da **Guadalupe Sistemas**, empresa de tecnologia especializada em **inteligência artificial, automação de processos e desenvolvimento de sistemas sob medida**, atendendo principalmente clínicas, escritórios de engenharia e empresas de serviços a partir do Centro-Oeste de Minas Gerais — menos tarefa manual, mais resultado.

🔗 **Site em Produção:** [guadalupesistemas.com.br](https://guadalupesistemas.com.br/)  
📲 **WhatsApp Comercial:** [+55 37 99832-3232](https://wa.me/5537998323232)

---

## 📚 Documentação do Projeto

Este repositório adota uma documentação modular projetada tanto para desenvolvedores humanos quanto para agentes de Inteligência Artificial:

| Documento | Descrição e Finalidade |
| :--- | :--- |
| 🤖 [**`AGENTS.md`**](./AGENTS.md) | **Diretrizes para IA e Desenvolvedores:** Regras de ouro, protocolo de sincronização de docs, padrões de código (HTML/CSS/JS), tom de voz da marca, glossário terminológico, segurança e checklist pré-entrega. |
| 📐 [**`SPEC.md`**](./SPEC.md) | **Especificação Técnica e de Produto:** Inventário de rotas, detalhamento das 13 seções do `index.html`, tokens do Design System v2, especificação dos scripts (`js/script.js` e `js/cookie-consent.js`), metadados SEO e template padrão para blog. |
| 🏛 [**`DECISIONS.md`**](./DECISIONS.md) | **Registro de Decisões Técnicas:** Narrativa por tópicos justificando escolhas de engenharia e produto (Zero-Build vs. Frameworks, Funil via WhatsApp, conformidade LGPD, animações nativas). |
| 🗺 [**`PLAN.md`**](./PLAN.md) | **Roadmap de Evolução:** Backlog priorizado com fases de curto, médio e longo prazo (testes E2E com Playwright, persistência de leads via Webhooks/Serverless, CMS Headless para o blog). |
| 🔍 [**`llms.txt`**](./llms.txt) | **Contexto Sintético para IA:** Resumo executivo para consumo rápido por crawlers e assistentes de IA sobre os serviços e canais da Guadalupe Sistemas. |
| 📊 [**`docs/analytics.md`**](./docs/analytics.md) | **Referência de Medição:** Eventos disparados pelo site, dimensão `page_group`, rastreamento de origem no WhatsApp e passo a passo para ligar GTM e Search Console. |
| 📖 [**`llms-full.txt`**](./llms-full.txt) | **Base de Conhecimento Completa para IA:** Conteúdo integral do site em Markdown puro (serviços, metodologias, cases, FAQs e artigos do blog). |

---

## 🗂 Estrutura do Projeto

```
guadalupesistemas-lp/
├── index.html                          # Home (13 seções)
│
│   # Páginas-pilar (categoria e fundo de funil)
├── inteligencia-artificial-para-empresas/
├── desenvolvimento-de-sistemas/
├── automacao-de-whatsapp/
├── quanto-custa-um-sistema-personalizado/
├── automacao-e-sistemas-em-minas-gerais/   # SEO local
│
├── solucoes/                           # Hub + 5 páginas de solução
│   ├── agentes-de-ia/
│   ├── automacao-de-processos/
│   ├── assistente-de-conhecimento/
│   ├── sistemas-sob-medida/
│   └── aplicativos/
├── para-clinicas/                      # Vertical saúde
├── para-engenharia/                    # Vertical engenharia e arquitetura
├── diagnostico-de-ia/                  # Oferta de entrada
├── casos/                              # Hub + 3 casos detalhados
├── sobre/                              # Institucional (inclui a stack técnica)
├── contato/                            # Formulário completo
├── seguranca-e-lgpd/                   # Tratamento de dados
├── politica-de-privacidade/            # Conformidade LGPD
├── blog/                               # Índice + 13 artigos em 3 clusters
│
├── css/styles.css                      # Design System v2 (Violet/Elevate), 28 seções
├── js/
│   ├── script.js                       # Lógica interativa, animações e formulário
│   ├── analytics.js                    # Camada de eventos (dataLayer + GA4)
│   └── cookie-consent.js               # Banner LGPD, Consent Mode v2 e GA4
├── assets/                             # Logos e imagem de compartilhamento
│
├── partials/                           # FONTE ÚNICA de nav e footer
│   ├── nav.html
│   ├── footer.html
│   └── page-template.html              # Molde para novas páginas
├── tools/                              # Ferramentas de desenvolvimento (Node, dev-only)
├── docs/analytics.md                   # Referência da medição
│
├── AGENTS.md  SPEC.md  DECISIONS.md  PLAN.md   # Documentação do projeto
├── vercel.json                         # 301 das URLs antigas, headers e cache
├── .vercelignore                       # Exclui partials/, tools/ e docs/ do deploy
├── llms.txt  llms-full.txt             # Contexto para IA/crawlers
├── robots.txt  sitemap.xml             # Indexação
└── site.webmanifest                    # Manifesto PWA e favicons
```

---

## ⚠️ Antes de editar nav ou footer

**Não edite o `<nav>` ou o `<footer>` dentro das páginas.** Eles são gerados a partir de `partials/` — qualquer alteração direta é sobrescrita na próxima sincronização.

```bash
# 1. edite partials/nav.html ou partials/footer.html
# 2. propague para todas as páginas
node tools/sync-layout.mjs
```

Cada página delimita os blocos assim:

```html
<!-- gs:nav:start variant="solid" active="solucoes" -->
   ...gerado automaticamente...
<!-- gs:nav:end -->
```

`variant="solid"` deixa a navbar opaca (todas as páginas exceto a home) e `active="..."` acende o item correspondente do menu.

---

## ✅ Verificadores

Rode todos antes de qualquer commit:

```bash
node tools/sync-layout.mjs --check   # nav/footer em sincronia com partials/
node tools/check-links.mjs           # todo href interno resolve para um arquivo real
node tools/check-seo.mjs             # title, description e canonical presentes e únicos
node tools/check-quality.mjs         # H1 único, FAQ × JSON-LD, alt, rel=noopener
node tools/build-sitemap.mjs         # regenera sitemap.xml a partir da árvore
```

São scripts Node **sem dependências**, executados apenas na máquina do desenvolvedor. Não fazem parte do deploy — a Vercel continua servindo arquivos estáticos, e `.vercelignore` remove `tools/` do publish.

`check-links.mjs` existe por um motivo concreto: os três cards de artigos da home apontavam para `href="#"` e o clique não fazia nada. O script falha se isso voltar a acontecer.

---

## 🛠 Stack Tecnológico

- **HTML5 Semântico:** Estrutura acessível com metadados Open Graph e schemas JSON-LD (`Organization`, `WebSite`, `BreadcrumbList`, `Service`, `Article`, `FAQPage`, `Blog`, `AboutPage`, `ContactPage`).
- **CSS3 Puro:** Design System nativo em variáveis CSS, sem dependência de Tailwind ou Bootstrap.
- **JavaScript Vanilla:** Sem frameworks pesados; uso de APIs modernas (`IntersectionObserver`, `requestAnimationFrame`, `localStorage`).
- **Privacidade & Métricas:** Banner LGPD com Consent Mode v2 e carregamento do Google Analytics 4 sob consentimento (`gtag.js` com IP anonimizado), mais camada própria de eventos de funil em `js/analytics.js` — ver [`docs/analytics.md`](./docs/analytics.md).
- **Hospedagem & Deploy:** [Vercel](https://vercel.com/) com deploy contínuo na branch principal.

> **Arquitetura 100% Estática (Zero-Build):** Sem etapas de compilação ou dependências de runtime Node.js/npm.

---

## 🚀 Rodando Localmente

Por ser um projeto puramente estático, basta servir os arquivos a partir da raiz. As páginas usam caminhos absolutos (`/css/styles.css`), portanto abrir o HTML direto no navegador (`file://`) **não** funciona — é preciso um servidor:

```bash
# Opção 1: Com VS Code Live Server
# Clique com o botão direito em index.html > "Open with Live Server"

# Opção 2: Com Python 3
python3 -m http.server 5500

# Opção 3: Com Node (npx)
npx serve .
```

Acesse no navegador: `http://localhost:5500` (ou a porta indicada no terminal).

---

## ☁️ Deploy

O deploy é gerenciado automaticamente pela **Vercel** conectado ao repositório GitHub. Qualquer push na branch principal atualiza imediatamente o ambiente de produção.

---

## 📄 Licença

Todos os direitos reservados © **Guadalupe Sistemas**.
