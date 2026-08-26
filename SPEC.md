# Especificação Técnica e de Produto (SPEC.md)

Este documento descreve a especificação técnica, estrutural e funcional completa da landing page e do ecossistema de páginas da **Guadalupe Sistemas**.

---

## 🎯 1. Visão Geral do Produto

- **Propósito:** Apresentar os serviços de inteligência artificial, automação e desenvolvimento sob medida da Guadalupe Sistemas, educar clientes dos nichos prioritários (Saúde/Clínicas e Engenharia/Projetos) e converter visitantes em leads qualificados via WhatsApp.
- **Domínio Principal:** `https://guadalupesistemas.com.br/`
- **Contato WhatsApp Oficial:** `+55 37 99832-3232`

---

## 🗺️ 2. Inventário de Páginas e Rotas

| Arquivo | Rota / URL | Descrição e Finalidade |
| :--- | :--- | :--- |
| `index.html` | `/` | Landing page principal com toda a escada de valor, casos e formulário de conversão |
| `blog.html` | `/blog.html` | Índice de artigos do blog institucional |
| `7-motivos-para-colocar-seus-dados-na-nuvem.html` | `/7-motivos-...` | Artigo focado em segurança, economia e infraestrutura de nuvem |
| `seguranca-de-guardar-dados-na-nuvem.html` | `/seguranca-...` | Artigo focado em conformidade LGPD, criptografia e proteção de dados |
| `politica-de-privacidade.html` | `/politica-...` | Termos e política de privacidade conforme as diretrizes da LGPD |

---

## 📑 3. Estrutura de Seções da Landing Page (`index.html`)

A página inicial é composta por 16 seções sequenciais e modulares:

1. **Header / Navbar (`.navbar`):**
   - Logo da marca, links de navegação âncora (`#inicio`, `#desafios`, `#diagnostico`, `#servicos`, `#casos`, `#faq`, `#blog`), botão CTA "Falar no WhatsApp" e botão de menu hambúrguer para dispositivos móveis (`.mobile-menu-btn`).
2. **Hero Section (`#inicio` / `.hero`):**
   - Headline de alto impacto ("IA, automação e sistemas sob medida para clínicas e empresas de engenharia"), badges de nicho, botões de ação principal ("Quero um Diagnóstico de IA" e "Conhecer Serviços") e cards com métricas destacadas.
3. **Desafios por Segmento (`#desafios`):**
   - Abas/cards divididos em dois grandes blocos:
     - *Clínicas & Consultórios:* No-show, sobrecarga na recepção, perda de agendamentos fora do horário comercial.
     - *Empresas de Engenharia & Arquitetura:* Busca lenta em documentos/normas, propostas manuais demoradas, falha de comunicação interna.
4. **Oferta do Diagnóstico de IA (`#diagnostico`):**
   - Apresentação do produto de entrada (a partir de R$ 2.500), destacando entregáveis: mapeamento de processos, cálculo de ROI e roadmap de implementação, com cláusula de abatimento do valor em projetos subsequentes.
5. **Sobre a Guadalupe Sistemas (`#sobre`):**
   - Posicionamento da empresa como parceira técnica transparente focada em eficiência operacional e ROI real, sem promessas vazias.
6. **Escada de Serviços (`#servicos`):**
   - Grid com os 5 pilares de atuação:
     1. Diagnóstico de IA
     2. Agentes de WhatsApp & Atendimento 24h
     3. Automação de Processos & Integrações
     4. Assistente de Conhecimento (RAG / Treinamento em documentos internos)
     5. Sites, Sistemas e Aplicativos sob Medida
7. **Públicos-Alvo (`#publicos`):**
   - Detalhamento de como as soluções se aplicam a clínicas médicas, odontologia, veterinária, escritórios de engenharia, arquitetura, contabilidade e indústrias.
8. **Diferenciais / Por Que a Guadalupe (`#por-que`):**
   - 4 pilares de confiança: Entrega ágil (4 a 12 semanas), ROI comprovado, soluções personalizadas e suporte contínuo.
9. **Metodologia em 4 Passos (`.steps-section`):**
   - Timeline do processo: 1. Diagnóstico → 2. Estratégia & Design → 3. Implementação & Treinamento → 4. Evolução Contínua.
10. **Casos de Sucesso Reais (`#casos`):**
    - Cards de estudo de caso práticos:
      - *CliniMed:* Redução de 58% no no-show com agente de agendamento WhatsApp.
      - *EngTech Soluções:* Geração de propostas técnicas automatizada de 4 horas para 15 minutos.
11. **Stack Tecnológico (`.tech-section`):**
    - Apresentação das tecnologias utilizadas pela equipe técnica: Python, LangChain, LlamaIndex, OpenAI, Claude, FastAPI, PostgreSQL, Supabase, Vercel e Docker.
12. **Números de Impacto (`.numbers-section`):**
    - Contadores animados: Horas economizadas (+5.000h), Redução média de faltas (-50%), Tempo de resposta imediato (<2min).
13. **Depoimentos de Clientes (`.testimonials-section`):**
    - Carrossel rotativo com depoimentos de médicos, diretores clínicos e sócios de engenharia.
14. **Perguntas Frequentes (`#faq`):**
    - Accordion interativo tratando as principais objeções de compra (ROI, substituição de equipe, segurança de dados/LGPD, complexidade técnica).
15. **Formulário Multi-etapas (`#formulario`):**
    - Formulário em 3 passos:
      - *Passo 1:* Seleção da solução de interesse (Diagnóstico, Agente WhatsApp, Automação, Software Sob Medida).
      - *Passo 2:* Descrição do principal desafio operacional atual.
      - *Passo 3:* Identificação do contato (Nome) e botão de envio para o WhatsApp.
16. **Prévia do Blog (`#blog`) & CTA Final (`.cta-final-section`) + Rodapé:**
    - Chamadas para os artigos mais recentes, CTA de fechamento e rodapé com dados institucionais, links rápidos e termos de privacidade.

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

### 5.1. Script Principal ([`js/script.js`](file:///home/munraitoo13/Projects/guadalupesistemas-lp/js/script.js))

| Módulo | Gatilho / Evento | Comportamento e Regras |
| :--- | :--- | :--- |
| **Mobile Menu** | Clique em `.mobile-menu-btn` | Alterna `.active` na `.nav-links`, adiciona `.menu-open` na navbar e alterna ícone FontAwesome `fa-bars` ↔ `fa-xmark`. Fecha automaticamente ao clicar em links internos. |
| **Navbar Scroll** | Evento `window.scroll` | Adiciona classe `.scrolled` quando `window.scrollY > 50` para alterar fundo e sombra. |
| **Scroll-Spy** | Evento `window.scroll` | Calcula a seção visível (`scrollY + 120px`) e aplica `.active` no link correspondente na navbar. |
| **Smooth Scroll** | Clique em `a[href^="#"]` | Realiza rolagem suave compensando o offset fixo da barra (`NAVBAR_OFFSET = 80px`). |
| **Animações de Entrada** | `IntersectionObserver` (threshold: 0.15) | Elementos com `.reveal` recebem `.revealed`. Grids possuem *stagger* automático de `0.1s * index`. |
| **FAQ Accordion** | Clique em `.faq-question` | Abre a resposta clicada animando `maxHeight = scrollHeight + 'px'` e fecha automaticamente todos os outros itens. |
| **Multi-Step Form** | Cliques em `.form-next`, `.form-prev` e submit | Valida campos obrigatórios (`input`, `textarea`, `radio`) da etapa atual antes de avançar. Ao finalizar, chama `sendToWhatsApp`. |
| **WhatsApp URL Generator** | Disparo do formulário | Monta payload codificado em URI com nome, solução e dor, redirecionando para `https://wa.me/5537998323232?text=...`. |
| **Carrossel de Depoimentos** | Intervalo de 6000ms ou clique nas bolinhas | Alterna classe `.active` entre `.testimonial-slide`. Pausa rotação automática no evento `mouseenter` do container. |
| **Contadores Numéricos** | `IntersectionObserver` (threshold: 0.3) | Anima valores de `0` até `data-target` ao longo de 2000ms com curva *ease-out quad*. |

### 5.2. Gestão de Consentimento e Cookies ([`js/cookie-consent.js`](file:///home/munraitoo13/Projects/guadalupesistemas-lp/js/cookie-consent.js))

- **Chave de Armazenamento:** `localStorage.getItem('gs_cookie_consent')`.
- **Estados Possíveis:**
  - `'accepted'`: Dispara o agendamento do Google Analytics (`G-QPZ3J2WTTM`) sob demanda (ao interagir com a tela ou após 5s).
  - `'rejected'`: Esconde o banner e bloqueia qualquer injeção de script de rastreamento.
  - `null` (Primeiro acesso): Constrói e exibe dinamicamente o banner com as opções Aceitar / Recusar.
- **Configuração GA4:** `anonymize_ip: true`.

---

## 🔍 6. Metadados, SEO e Arquivos Auxiliares

- **`robots.txt`:** Permite indexação de todas as páginas públicas e aponta a localização de `https://guadalupesistemas.com.br/sitemap.xml`.
- **`sitemap.xml`:** Lista todas as URLs canônicas (`/`, `/blog.html`, artigos e política de privacidade) com frequência de atualização e prioridade.
- **`llms.txt`:** Arquivo padronizado para IA descrevendo a empresa, síntese dos serviços oferecidos, links de âncoras e contatos oficiais.
- **`site.webmanifest`:** Metadados para PWA e navegadores mobile (`name`, `theme_color: #0C0A23`, ícones de 192x192 e 512x512).
- **JSON-LD Schemas:**
  - `Organization`: Nome, URL, logo oficial, telefone de atendimento e redes sociais.
  - `FAQPage`: Perguntas e respostas principais da seção de FAQ para exibição rica nos resultados de busca do Google.
