# Especificação Técnica e de Produto (SPEC.md)

Este documento descreve a especificação técnica, estrutural e funcional completa da landing page e do ecossistema de páginas da **Guadalupe Sistemas**.

---

## 🎯 1. Visão Geral do Produto

- **Propósito:** Apresentar os serviços de inteligência artificial, automação e desenvolvimento sob medida da Guadalupe Sistemas, educar clientes dos nichos prioritários (Saúde/Clínicas e Engenharia/Projetos) e converter visitantes em leads qualificados via WhatsApp.
- **Domínio Principal:** `https://guadalupesistemas.com.br/`
- **Contato WhatsApp Oficial:** `+55 37 99832-3232`

---

## 🗺️ 2. Inventário de Páginas e Rotas

O site usa **URLs em pasta** (`/para-clinicas/` → `para-clinicas/index.html`). As URLs `.html` antigas têm redirecionamento 301 configurado em `vercel.json`.

### Comerciais

| Arquivo | Rota | Finalidade |
| :--- | :--- | :--- |
| `index.html` | `/` | Home: hero, seletor de cenário, desafios, soluções, casos, diagnóstico, método, resultados, relatos, FAQ, formulário |
| `inteligencia-artificial-para-empresas/index.html` | `/inteligencia-artificial-para-empresas/` | Pilar da categoria IA: o que resolve, onde não é a resposta, por onde começar |
| `desenvolvimento-de-sistemas/index.html` | `/desenvolvimento-de-sistemas/` | Pilar da categoria sistemas: o que construímos, como, quando não vale |
| `automacao-de-whatsapp/index.html` | `/automacao-de-whatsapp/` | Pilar do caso de uso por canal: o que dá e o que não dá para automatizar |
| `quanto-custa-um-sistema-personalizado/index.html` | `/quanto-custa-um-sistema-personalizado/` | Fundo de funil: os 8 fatores de preço, custo total e método de orçamento |
| `automacao-e-sistemas-em-minas-gerais/index.html` | `/automacao-e-sistemas-em-minas-gerais/` | SEO local: contexto da região, tipos de projeto, atendimento remoto |
| `diagnostico-de-ia/index.html` | `/diagnostico-de-ia/` | Oferta de entrada, a partir de R$ 2.500, com método, entregáveis e FAQ |
| `para-clinicas/index.html` | `/para-clinicas/` | Vertical saúde: no-show, confirmação, agendamento, retorno de pacientes |
| `para-engenharia/index.html` | `/para-engenharia/` | Vertical engenharia: propostas, orçamentos, documentos, normas, CRM |
| `solucoes/index.html` | `/solucoes/` | Hub das soluções |
| `solucoes/agentes-de-ia/index.html` | `/solucoes/agentes-de-ia/` | Agente de WhatsApp com IA |
| `solucoes/automacao-de-processos/index.html` | `/solucoes/automacao-de-processos/` | Lembretes, documentos, integrações, CRM |
| `solucoes/assistente-de-conhecimento/index.html` | `/solucoes/assistente-de-conhecimento/` | RAG sobre documentos e normas internas |
| `solucoes/sistemas-sob-medida/index.html` | `/solucoes/sistemas-sob-medida/` | Painel, CRM próprio, portal do cliente |
| `solucoes/aplicativos/index.html` | `/solucoes/aplicativos/` | Apps web e mobile sob medida |

### Prova social

| Arquivo | Rota | Finalidade |
| :--- | :--- | :--- |
| `casos/index.html` | `/casos/` | Hub dos casos |
| `casos/app-agendamento-clinica/index.html` | `/casos/app-agendamento-clinica/` | Aplicativo de escala e agendamento em clínica |
| `casos/atendimento-automatizado-whatsapp/index.html` | `/casos/atendimento-automatizado-whatsapp/` | Centralização do atendimento comercial |
| `casos/painel-gestao-industria/index.html` | `/casos/painel-gestao-industria/` | Painel de gestão substituindo planilhas |

### Institucionais e conteúdo

| Arquivo | Rota | Finalidade |
| :--- | :--- | :--- |
| `sobre/index.html` | `/sobre/` | Quem somos, método e stack tecnológica |
| `contato/index.html` | `/contato/` | Formulário completo com consentimento LGPD |
| `seguranca-e-lgpd/index.html` | `/seguranca-e-lgpd/` | Tratamento de dados, acesso, retenção, dados de saúde |
| `politica-de-privacidade/index.html` | `/politica-de-privacidade/` | Política de privacidade |
| `blog/index.html` | `/blog/` | Índice dos artigos |
| `blog/o-que-e-automacao-de-processos/index.html` | `/blog/o-que-e-automacao-de-processos/` | Artigo — cluster Automação |
| `blog/processos-que-sua-empresa-pode-automatizar/index.html` | `/blog/processos-que-sua-empresa-pode-automatizar/` | Artigo — cluster Automação |
| `blog/como-calcular-roi-de-uma-automacao/index.html` | `/blog/como-calcular-roi-de-uma-automacao/` | Artigo — cluster Automação |
| `blog/automacao-substitui-funcionarios/index.html` | `/blog/automacao-substitui-funcionarios/` | Artigo — cluster Automação |
| `blog/como-usar-ia-na-sua-empresa/index.html` | `/blog/como-usar-ia-na-sua-empresa/` | Artigo — cluster IA |
| `blog/quanto-custa-implementar-ia-em-uma-empresa/index.html` | `/blog/quanto-custa-implementar-ia-em-uma-empresa/` | Artigo — cluster IA |
| `blog/como-escolher-empresa-de-desenvolvimento-de-sistemas/index.html` | `/blog/como-escolher-empresa-de-desenvolvimento-de-sistemas/` | Artigo — cluster Sistemas |
| `blog/como-transformar-planilha-em-sistema/index.html` | `/blog/como-transformar-planilha-em-sistema/` | Artigo — cluster Sistemas |
| `blog/automacao-economia-de-horas/index.html` | `/blog/automacao-economia-de-horas/` | Artigo — Produtividade |
| `blog/quando-investir-em-sistema-proprio/index.html` | `/blog/quando-investir-em-sistema-proprio/` | Artigo — Gestão |
| `blog/organizar-atendimento-whatsapp/index.html` | `/blog/organizar-atendimento-whatsapp/` | Artigo — Atendimento |
| `blog/7-motivos-para-colocar-seus-dados-na-nuvem/index.html` | `/blog/7-motivos-.../` | Artigo — Tecnologia e Segurança |
| `blog/seguranca-de-guardar-dados-na-nuvem/index.html` | `/blog/seguranca-.../` | Artigo — Tecnologia e Segurança |

**Total: 37 páginas indexáveis.** `sitemap.xml` é gerado a partir da árvore de arquivos por `node tools/build-sitemap.mjs`.

### Malha de links dos clusters

Cada artigo linka a página-pilar correspondente no meio do texto, e cada pilar linka de volta pelo bloco "Veja também". As três páginas de preço — `/quanto-custa-um-sistema-personalizado/`, `/blog/quanto-custa-implementar-ia-em-uma-empresa/` e o trecho de custo em `/blog/quando-investir-em-sistema-proprio/` — **linkam entre si em vez de repetir conteúdo**, para não competirem pela mesma busca.

| Cluster | Pilar | Artigos de apoio |
| :--- | :--- | :--- |
| Automação | `/solucoes/automacao-de-processos/` | `o-que-e-automacao-de-processos`, `processos-que-sua-empresa-pode-automatizar`, `como-calcular-roi-de-uma-automacao`, `automacao-substitui-funcionarios`, `automacao-economia-de-horas` |
| IA | `/inteligencia-artificial-para-empresas/` | `como-usar-ia-na-sua-empresa`, `quanto-custa-implementar-ia-em-uma-empresa` |
| Sistemas | `/desenvolvimento-de-sistemas/` e `/quanto-custa-um-sistema-personalizado/` | `como-escolher-empresa-de-desenvolvimento-de-sistemas`, `como-transformar-planilha-em-sistema`, `quando-investir-em-sistema-proprio` |
| WhatsApp | `/automacao-de-whatsapp/` | `organizar-atendimento-whatsapp` |

### Arquivos que NÃO são publicados

`partials/`, `tools/` e `docs/` são excluídos do deploy por `.vercelignore`. `partials/` contém fragmentos de HTML sem `<head>`; publicados, virariam páginas rasas indexáveis.

---

## 📑 3. Estrutura de Seções da Home (`index.html`)

A home foi reorganizada para ordem de decisão: o visitante se identifica, reconhece o problema, vê a solução e a prova, e só então encontra o formulário. São **13 seções**, todas com `id`.

| # | `id` | Seção | Papel |
| :-- | :--- | :--- | :--- |
| 1 | `#inicio` | Hero | H1 de entidade — "IA, automação e sistemas sob medida para empresas" — + CTA "Fazer meu diagnóstico" |
| 2 | `#cenarios` | Escolha seu cenário | 3 cards → `/para-clinicas/`, `/para-engenharia/`, `/solucoes/` |
| 3 | `#desafios` | Desafios | 8 dores em 3 grupos (clínicas, engenharia, geral) |
| 4 | `#servicos` | Escada de serviços | 5 cards, cada um linkando para sua página em `/solucoes/` |
| 5 | `#casos` | Casos reais | 3 cards, cada um linkando para `/casos/<slug>/` |
| 6 | `#diagnostico` | Diagnóstico de IA | Oferta de entrada, a partir de R$ 2.500 |
| 7 | `#como-funciona` | Método em 4 passos | Bate-papo → Planejamento → Construção → Acompanhamento |
| 8 | `#resultados` | Números | Contadores 90% / 5 min-dia / 100%, cada um com link `.number-source` para o caso que o originou |
| 9 | `#relatos` | Relatos por segmento | Carrossel sem nome ou foto fabricados |
| 10 | `#por-que` | Por que a Guadalupe | 4 diferenciais concretos |
| 11 | `#faq` | FAQ | Accordion de 5 objeções, espelhado no JSON-LD `FAQPage` |
| 12 | `#formulario` | Formulário | 3 etapas → WhatsApp |
| 13 | `#blog` | Leitura rápida | 3 artigos + "Ver todos os artigos" |

Mais o CTA final (`.cta-final-section`), o nav e o footer.

### Regras que valem para todas as páginas

- Toda `<section class="section-dark">` precisa de `<div class="pixel-texture"></div>` como primeiro filho, e do `.container` interno em `position: relative; z-index: 1`.
- Contadores só animam dentro de uma `<section class="numbers-section">` — o observador é `document.querySelector(".numbers-section")` e falha em silêncio, imprimindo o valor estático.
- O valor final do contador fica no HTML (`>90%<`), não `0`. O JS anima de 0 até ele. Sem isso, crawlers e prévias de link leem zero.
- Todo número de resultado precisa levar à sua origem: na home pelo link `.number-source`, na página de caso pelo bloco "Como esse número foi medido". Enquanto a metodologia não for confirmada pelo cliente, o texto visível diz só o que é verificável e a pendência fica em `<!-- TODO -->`.
- Toda `.section-dark` que usa `.steps-timeline` depende das regras `.section-dark .step-number` e `.section-dark .step-item h3` — sem elas o anel branco do número e o título ficam ilegíveis sobre o navy.

### Seções que saíram da home

- **Stack tecnológica** (`.tech-section`) migrou para `/sobre/`: pilha técnica não é critério de decisão do comprador.
- **"Nossa Essência"** foi absorvida por `#por-que` e por `/sobre/`. A foto que a ilustrava era de banco de imagem apresentada como a equipe.

---

## 🎨 4. Design Tokens e Sistema de Estilos (`css/styles.css`)

### 4.1. Tokens Principais (`:root`)
```css
/* Paleta de Cores */
--violet-500: #6B4EE8;        /* Acento primário / botões / destaques */
--violet-600: #5B3FD6;        /* Hover de botões primários */
--violet-400: #8B6CF5;        /* Gradientes e bordas sutis */
--violet-300: #B7A6F7;        /* Elementos secundários claros */

--navy-950: #0C0A23;          /* Fundo de seções dark (Hero, Tech, Por Que) */
--navy-900: #13112E;          /* Cards escuros e variações */

--ink-900: #16152B;           /* Títulos em seções claras */
--ink-500: #5C5B70;           /* Textos corridos e parágrafos */
--title-light-color: #9A99AD; /* Subtítulos em seções escuras */

--gray-100: #F6F6F9;          /* Fundo de seções .section-light */
--lavender-50: #EFEDF7;       /* Fundo de cards suaves */
--white: #FFFFFF;             /* Fundo de seções .section-white e superfícies */

/* Tipografia */
--font-heading: 'Sora', sans-serif;
--font-body: 'Inter', sans-serif;

/* Efeitos e Transições */
--shadow-soft: 0 10px 30px rgba(20, 20, 40, 0.06);
--shadow-md: 0 16px 40px rgba(20, 20, 40, 0.10);
--shadow-glow: 0 8px 32px rgba(107, 78, 232, 0.25);
--transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
```

### 4.2. Classes de Componentes Essenciais
- `.btn`: Classe base de botões.
- `.btn-primary-violet`: Botão com preenchimento violeta e brilho sutil ao hover.
- `.btn-ghost` / `.btn-outline`: Botões transparentes com borda para ações secundárias.
- `.challenge-card`: Card com ícone, título e lista de dores específicas por nicho.
- `.service-card`: Card de serviço com ícone circular violeta e link de ação.
- `.glass-card`: Card com efeito de vidro translúcido (`backdrop-filter: blur(12px)`).
- `.faq-item` / `.faq-question` / `.faq-answer`: Estrutura de acordeão com transição de `max-height`.
- `.multi-step-form` / `.form-step`: Gerenciamento visual das etapas do formulário.

---

## ⚙️ 5. Especificação Funcional dos Scripts

Ordem de carregamento em toda página: `js/cookie-consent.js` (defer, no `<head>`), depois `js/analytics.js` e `js/script.js` antes de `</body>`. **`analytics.js` precisa vir antes de `script.js`** — `sendToWhatsApp()` usa `window.GS.waUrl()`.

### 5.1. Script Principal (`js/script.js`)

| Módulo | Gatilho | Comportamento |
| :--- | :--- | :--- |
| **Mobile Menu** | Clique em `.mobile-menu-btn` | `setMenuState(open)` centraliza classes e `aria-expanded`, alternando `fa-bars` ↔ `fa-xmark`. Fecha ao clicar em qualquer link do menu. |
| **Navbar Scroll** | `window.scroll` | Adiciona `.scrolled` quando `scrollY > 50`. |
| **Link ativo** | Carga da página | Baseado em `location.pathname`, não em scroll. `tools/sync-layout.mjs` já grava `.active` no HTML; o JS só cobre páginas filhas e nunca apaga o estado do servidor. |
| **Ano do rodapé** | Carga da página | Preenche `[data-current-year]` com o ano corrente. |
| **Smooth Scroll** | Clique em `a[href^="#"]` | Rolagem suave com `NAVBAR_OFFSET = 80px`. Ignora `#` vazio. |
| **Animações** | `IntersectionObserver` (0.15) | `.reveal` → `.revealed`, com *stagger* de `0.1s * index` nos grids. |
| **FAQ Accordion** | Clique em `.faq-question` | Anima `maxHeight` e fecha os irmãos. |
| **Multi-Step Form** | `.form-next`, `.form-prev`, submit | Valida a etapa antes de avançar. Radios são validados como grupo (`input.value` devolve o atributo mesmo sem seleção, então passariam na checagem comum). O destaque de erro usa `.chips-group`. |
| **WhatsApp URL** | Submit do formulário | Lê `solucao`, `objetivo`, `nome` e `contato`; delega a montagem a `window.GS.waUrl(origem, mensagem)`. |
| **Carrossel** | 6000ms ou clique nas bolinhas | Alterna `.active` entre slides, pausa no `mouseenter`. |
| **Contadores** | `IntersectionObserver` (0.3) | Anima de 0 até `data-target` em 2000ms, *ease-out quad*. |

### 5.2. Consentimento e Analytics (`js/cookie-consent.js`)

- **Chave:** `localStorage['gs_cookie_consent']` (`accepted` | `rejected` | ausente).
- **Consent Mode v2:** declarado com tudo negado **antes** de qualquer tag do Google; `security_storage` permanece concedido. O "Aceitar" dispara `gtag('consent', 'update', ...)`.
- **GA4:** `G-QPZ3J2WTTM`, com `anonymize_ip: true`. Carrega **imediatamente** após o consentimento — o atraso anterior de 5s/primeira interação descartava o pageview de quem saía rápido.
- **GTM:** constante `GTM_ID`, vazia por padrão. Preenchida, injeta o container. Vazia, só o GA4 direto carrega.

### 5.3. Camada de Eventos (`js/analytics.js`)

Publica `window.GS` e envia cada evento para `window.dataLayer` **e** para `gtag`, funcionando com ou sem GTM.

| API | Uso |
| :--- | :--- |
| `GS.track(nome, params)` | Dispara um evento. Anexa `page_group`, `page_slug` e os UTM da sessão. |
| `GS.waUrl(origem, mensagem)` | Monta a URL do `wa.me` com `encodeURIComponent` e assinatura de origem. |
| `GS.pageGroup` / `GS.pageSlug` | Contexto da página atual. |

**Eventos:** `scroll_90`, `click_whatsapp`, `click_diagnostico`, `click_case`, `blog_article_view`, `form_start`, `form_step_1`, `form_step_2`, `generate_lead`.

**`page_group`:** `home` · `clinicas` · `engenharia` · `diagnostico` · `solucao` · `caso` · `blog` · `institucional`. Precisa ser registrada como dimensão personalizada no GA4 para aparecer nos relatórios.

Todo link `wa.me` é reescrito na carga para carregar a origem (`data-wa-origin`) na mensagem. Os UTM da primeira página ficam em `sessionStorage`, para que um lead que chega por anúncio, lê um artigo e só depois chama no WhatsApp continue atribuído à campanha.

Detalhes completos em [`docs/analytics.md`](./docs/analytics.md).

### 5.4. Ferramentas de Desenvolvimento (`tools/`)

Node puro, sem dependências, **fora do deploy**. Rodar antes de todo commit:

| Script | Verifica |
| :--- | :--- |
| `sync-layout.mjs` | Propaga `partials/nav.html` e `footer.html` para os blocos `gs:nav` / `gs:footer`. `--check` falha se houver divergência. |
| `check-links.mjs` | Todo `href` interno resolve para um arquivo no disco. Rejeita `href="#"` e caminhos relativos. |
| `check-seo.mjs` | `title`, `meta description` e `canonical` presentes e únicos. |
| `check-quality.mjs` | Um `<h1>` por página, `FAQPage` idêntico à FAQ visível, `alt` em imagens, `rel` em `target="_blank"`. |
| `build-sitemap.mjs` | Gera `sitemap.xml` a partir da árvore. |

---

## 🔍 6. Metadados, SEO e Arquivos Auxiliares

- **`robots.txt`:** libera indexação geral, bloqueia `/partials/`, `/tools/` e `/docs/`, e aponta o sitemap.
- **`sitemap.xml`:** 37 URLs, gerado por `tools/build-sitemap.mjs`. Prioridade derivada do tipo de página.
- **`vercel.json`:** 301 das 4 URLs `.html` antigas para as novas em pasta, `trailingSlash: true`, headers de segurança e cache longo para `/assets/`, `/css/` e `/js/`.
- **`.vercelignore`:** remove `partials/`, `tools/`, `docs/` e `README.md` do publish.
- **`llms.txt` / `llms-full.txt`:** contexto para agentes de IA.
- **`site.webmanifest`:** metadados PWA (`theme_color: #0C0A23`).
- **JSON-LD (81 blocos, todos com JSON válido):**

| Tipo | Onde |
| :--- | :--- |
| `ProfessionalService`, `WebSite` | Home (`ProfessionalService` também na página regional; substituiu `Organization` para declarar `areaServed`) |
| `BreadcrumbList` | Todas as páginas internas |
| `Service` | Páginas de solução e verticais |
| `Article` | Artigos do blog e páginas de caso |
| `FAQPage` | Onde há FAQ visível — o texto precisa ser **idêntico** ao exibido |
| `Blog` + `ItemList` | `/blog/` |
| `AboutPage` / `ContactPage` | `/sobre/` e `/contato/` |

---

## 📝 7. Publicando um Novo Artigo de Blog

Artigos deixaram de ser arquivos soltos na raiz. Cada um vira uma pasta com `index.html`.

### Passo a passo

1. **Crie a pasta:** `blog/<slug-do-artigo>/index.html`.
2. **Clone o template:** copie `blog/organizar-atendimento-whatsapp/index.html`, o mais recente e completo.
3. **Atualize o `<head>`:** `description`, `keywords`, `og:*`, `twitter:*`, `article:published_time`, `canonical` e `<title>` (≤65 caracteres, padrão `Assunto | Guadalupe`).
4. **Atualize os dois blocos JSON-LD:** `Article` (headline, description, datePublished, dateModified, mainEntityOfPage) e `BreadcrumbList`.
5. **Marcadores de layout:** deixe `<!-- gs:nav:start variant="solid" active="blog" -->` / `<!-- gs:nav:end -->` e `<!-- gs:footer:start -->` / `<!-- gs:footer:end -->` **vazios** e rode `node tools/sync-layout.mjs`.
6. **Corpo:** hero com `.blog-tag`, `.article-title`, `.article-subtitle` e `.article-meta`; `.article-toc` com âncoras que batem com os `<h2 id="...">`; `.article-body`.
7. **Botões de compartilhar:** URLs reais de Facebook, X, LinkedIn e WhatsApp, já codificadas. Nunca `href="#"`.
8. **Cross-link comercial (obrigatório):** um link contextual no meio do texto para a página comercial correspondente, e um `.cta-box` no fim levando a `/diagnostico-de-ia/`. Artigo que não leva a lugar nenhum é conteúdo desperdiçado.
9. **Recomendados:** aponte `.recommended-posts` para 2 artigos irmãos.
10. **Índice:** adicione o card em `blog/index.html` (mais novo primeiro) e inclua a URL no `ItemList` do JSON-LD.
11. **Sincronize:** `node tools/build-sitemap.mjs` e acrescente o link em `llms.txt` e `llms-full.txt`.

### Regras de conteúdo

- **Nunca invente estatística, pesquisa ou fonte.** Nada de "estudos mostram que 73%…". Para falar de ordem de grandeza, deixe a conta explícita e verificável: "3 minutos por confirmação × 40 por dia × 22 dias úteis".
- **Nunca invente cliente, caso ou depoimento.** Onde faltar dado real, use `<!-- TODO: confirmar com o cliente — ... -->` sempre dentro de comentário HTML, nunca em texto visível.
- Escreva para quem decide (dono de clínica, sócio de escritório), não para desenvolvedor.
- 1.000 a 1.500 palavras, com 4 a 6 `<h2 id="...">`, todos listados na TOC.

### Verificação

```bash
node tools/sync-layout.mjs
node tools/check-links.mjs
node tools/check-seo.mjs
node tools/check-quality.mjs
node tools/build-sitemap.mjs
```

Nenhum artigo precisa de CSS novo: o kit `.article-*` já cobre hero, TOC, corpo, destaque, compartilhamento, bio do autor e recomendados.
