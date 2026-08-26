<div align="center">

<img src="assets/logo-completa.png" alt="Guadalupe Sistemas" width="320">

### IA, automação e sistemas sob medida para clínicas, consultórios e empresas de engenharia

[![Site](https://img.shields.io/badge/site-guadalupesistemas.com.br-1e3a8a?style=for-the-badge)](https://guadalupesistemas.com.br/)
[![Deploy](https://img.shields.io/badge/deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-f7df1e?style=for-the-badge)](#-stack)

</div>

---

## 📌 Sobre

Landing page institucional da **Guadalupe Sistemas**, empresa de tecnologia especializada em **diagnóstico de IA, agentes de WhatsApp, automação de processos e sistemas sob medida**, com foco em clínicas, consultórios e empresas de engenharia — menos tarefa manual, mais resultado.

🔗 **Site em Produção:** [guadalupesistemas.com.br](https://guadalupesistemas.com.br/)  
📲 **WhatsApp Comercial:** [+55 37 99832-3232](https://wa.me/5537998323232)

---

## 📚 Documentação do Projeto

Este repositório adota uma documentação modular projetada tanto para desenvolvedores humanos quanto para agentes de Inteligência Artificial:

| Documento | Descrição e Finalidade |
| :--- | :--- |
| 🤖 [**`AGENTS.md`**](./AGENTS.md) | **Diretrizes para IA e Desenvolvedores:** Regras de ouro, padrões de código (HTML/CSS/JS), tom de voz da marca (Brand Voice), convenções de Git (Conventional Commits) e checklist pré-entrega. |
| 📐 [**`SPEC.md`**](./SPEC.md) | **Especificação Técnica e de Produto:** Inventário de rotas, detalhamento das 16 seções do `index.html`, tokens do Design System v2, especificação dos scripts (`js/script.js` e `js/cookie-consent.js`) e metadados SEO. |
| 🏛 [**`DECISIONS.md`**](./DECISIONS.md) | **Registro de Decisões Técnicas:** Narrativa por tópicos justificando escolhas de engenharia e produto (Zero-Build vs. Frameworks, Funil via WhatsApp, conformidade LGPD, animações nativas). |
| 🗺 [**`PLAN.md`**](./PLAN.md) | **Roadmap de Evolução:** Backlog priorizado com fases de curto, médio e longo prazo (testes E2E com Playwright, persistência de leads via Webhooks/Serverless, CMS Headless para o blog). |
| 🔍 [**`llms.txt`**](./llms.txt) | **Contexto para LLMs:** Arquivo padronizado para consumo sintético por crawlers e assistentes de IA sobre os serviços e canais da Guadalupe Sistemas. |

---

## 🗂 Estrutura do Projeto

```
guadalupesistemas-lp/
├── index.html                                     # Landing page principal (16 seções)
├── blog.html                                       # Índice de artigos do blog
├── 7-motivos-para-colocar-seus-dados-na-nuvem.html  # Artigo do blog
├── seguranca-de-guardar-dados-na-nuvem.html         # Artigo do blog
├── politica-de-privacidade.html                   # Página de conformidade LGPD
├── css/
│   └── styles.css                                  # Design System v2 (Violet/Elevate)
├── js/
│   ├── script.js                                   # Lógica interativa, animações e formulário
│   └── cookie-consent.js                           # Banner LGPD e lazy loading do GA4
├── assets/
│   ├── logo-completa.png                           # Logo horizontal principal
│   ├── logo-simbolo.png                            # Símbolo da marca
│   └── og-image.jpg                                # Imagem de compartilhamento social (OG)
├── AGENTS.md                                       # Diretrizes para agentes de IA e devs
├── SPEC.md                                         # Especificação técnica e funcional
├── DECISIONS.md                                    # Registro narrativo de decisões
├── PLAN.md                                         # Roadmap técnico e backlog futuro
├── llms.txt                                        # Resumo padronizado para IA/crawlers
├── robots.txt                                      # Regras de indexação para buscadores
├── sitemap.xml                                     # Mapa de URLs do site
└── site.webmanifest                                # Manifesto PWA e favicons
```

---

## 🛠 Stack Tecnológico

- **HTML5 Semântico:** Estrutura acessível com metadados Open Graph e schemas JSON-LD (`Organization`, `FAQPage`).
- **CSS3 Puro:** Design System nativo em variáveis CSS, sem dependência de Tailwind ou Bootstrap.
- **JavaScript Vanilla:** Sem frameworks pesados; uso de APIs modernas (`IntersectionObserver`, `requestAnimationFrame`, `localStorage`).
- **Privacidade & Métricas:** Banner LGPD com carregamento sob demanda do Google Analytics 4 (`gtag.js` com IP anonimizado).
- **Hospedagem & Deploy:** [Vercel](https://vercel.com/) com deploy contínuo na branch principal.

> **Arquitetura 100% Estática (Zero-Build):** Sem etapas de compilação ou dependências de runtime Node.js/npm.

---

## 🚀 Rodando Localmente

Por ser um projeto puramente estático, basta servir os arquivos a partir da raiz:

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
