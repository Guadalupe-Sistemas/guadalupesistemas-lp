# Registro de Decisões Técnicas e de Produto (DECISIONS.md)

Este documento registra as principais decisões arquiteturais, técnicas, de produto e de design adotadas na concepção e manutenção da landing page da **Guadalupe Sistemas**, contextualizando o problema, as alternativas consideradas e os motivos que justificaram cada escolha.

---

## 🏛️ 1. Arquitetura Estática Zero-Build vs. Frameworks JS (Next.js, React, Astro)

### Contexto
A Guadalupe Sistemas precisava de uma presença web institucional de alta conversão, com excelente ranqueamento no Google (SEO), carregamento instantâneo em conexões móveis e custo de manutenção mínimo.

### Alternativas Consideradas
1. **Next.js / React / Nuxt:** Alta modularidade e ecossistema de componentes, porém traz complexidade de build (Node.js, Webpack/Turbopack, dependências npm periódicas, vulnerabilidades em pacotes e overhead de JavaScript no cliente).
2. **Astro / 11ty (Static Site Generators):** Ótimo para SSG, mas ainda adiciona uma etapa de compilação e dependências npm.
3. **HTML5 + CSS3 + Vanilla JavaScript puro (Zero-Build):** Arquivos estáticos puros servidos diretamente pelo CDN.

### Decisão & Racional
Optou-se por **HTML5, CSS3 e JavaScript Vanilla puro (Zero-Build)** hospedado na **Vercel**.
- **Performance Máxima:** *Time-to-First-Byte* (TTFB) e *First Contentful Paint* (FCP) próximos do limite físico da rede, sem custo de hidratação de framework.
- **Zero Manutenção de Dependências:** Não há risco de build quebrar por pacotes npm desatualizados ou vulnerabilidades de segurança (*Dependabot alerts*).
- **Facilidade de Manutenção e Edição:** Qualquer desenvolvedor ou agente de IA pode alterar diretamente os arquivos HTML/CSS sem precisar de ambiente Node configurado.

---

## 🎨 2. Design System v2 — Identidade Visual Violet / Elevate

### Contexto
A empresa atende dois públicos com perfis distintos: médicos/profissionais de saúde (que valorizam cuidado, acolhimento e confiabilidade) e engenheiros/arquitetos (que valorizam precisão técnica, modernidade e robustez). A identidade visual precisava equilibrar sofisticação tecnológica com sobriedade corporativa.

### Decisão & Racional
Foi estruturado o **Design System v2** em [`css/styles.css`](file:///home/munraitoo13/Projects/guadalupesistemas-lp/css/styles.css) baseado em variáveis CSS (`:root`):
- **Paleta de Cores:**
  - **Violeta (`--violet-500: #6B4EE8` / `--violet-600: #5B3FD6`):** Representa inteligência artificial, inovação e tecnologia moderna, atuando como cor de acento e conversão primária.
  - **Navy Profundo (`--navy-950: #0C0A23` / `--navy-900: #13112E`):** Traz peso institucional, autoridade e contraste premium para seções hero, pilares tecnológicos e números de impacto.
  - **Superfícies Neutras Claras (`--gray-100: #F6F6F9` / `--lavender-50: #EFEDF7`):** Proporcionam respiro visual e legibilidade em seções de conteúdo denso (casos de sucesso, FAQ, desafios).
- **Tipografia:**
  - **Sora (`--font-heading`):** Fonte geométrica contemporânea que transmite modernidade e precisão em títulos.
  - **Inter (`--font-body`):** Padrão da indústria para máxima legibilidade em textos corridos, tabelas e formulários em qualquer tamanho de tela.

---

## 📲 3. Funil de Conversão e Leads via WhatsApp Direct Link

### Contexto
Em serviços B2B de consultoria e desenvolvimento de IA, a velocidade de contato com o tomador de decisão é crucial. Formulários tradicionais com envio por e-mail ou armazenamento exclusivo em banco de dados geram lentidão no primeiro atendimento e menor taxa de resposta do lead.

### Decisão & Racional
Implementou-se um fluxo em que o formulário interativo de 3 etapas no site valida as intenções do usuário e gera uma URL dinâmica para abertura direta no **WhatsApp Comercial (+55 37 99832-3232)** com mensagem pré-formatada.
- **Benefícios:**
  - **Zero Fricção:** O lead já inicia a conversa no canal em que mais responde com agilidade (WhatsApp).
  - **Qualificação Prévia:** O texto automático já chega com nome, tipo de solução desejada (Diagnóstico, Agente WhatsApp, Automação, Software) e dor operacional principal.
  - **Sem Dependência de Backend:** A landing page não precisa de API ou banco de dados próprio para capturar leads imediatos.

---

## 🔒 4. Conformidade LGPD e Carregamento Lazy de Analytics

### Contexto
A conformidade com a LGPD (Lei Geral de Proteção de Dados) é obrigatória e fundamental para transmitir credibilidade, especialmente para clientes da área médica e jurídica. No entanto, scripts de rastreamento de terceiros (Google Tag / GA4) costumam atrasar o carregamento da página e violar regras de privacidade se disparados sem consentimento.

### Decisão & Racional
Foi desenvolvido um módulo independente em [`js/cookie-consent.js`](file:///home/munraitoo13/Projects/guadalupesistemas-lp/js/cookie-consent.js):
- **Consentimento Explícito:** O banner é exibido no primeiro acesso oferecendo opções claras de "Aceitar" e "Recusar".
- **Persistência Local:** A escolha do usuário é gravada no `localStorage` sob a chave `gs_cookie_consent`.
- **Carregamento Diferido (Lazy):** O script `gtag.js` só é injetado no DOM se houver consentimento expresso (`accepted`) e é disparado de forma preguiçosa no primeiro toque/scroll ou após 5 segundos, com anonimização de IP (`anonymize_ip: true`).

---

## 🔍 5. Estratégia Dupla de Descoberta: SEO Tradicional e IA (`llms.txt`)

### Contexto
Hoje a busca por fornecedores de tecnologia e IA ocorre tanto em motores de busca convencionais (Google, Bing) quanto via assistentes inteligentes e mecanismos de busca por IA (Perplexity, ChatGPT Search, Gemini, Claude).

### Decisão & Racional
- **SEO On-Page & Dados Estruturados:**
  - Inclusão de schemas JSON-LD para `Organization` e `FAQPage` (permitindo respostas ricas no Google).
  - Metatags Open Graph e Twitter Cards completas, canonical URL em todas as páginas, `sitemap.xml` e `robots.txt`.
- **Adoção do Padrão `llms.txt`:**
  - Criação do arquivo [`llms.txt`](file:///home/munraitoo13/Projects/guadalupesistemas-lp/llms.txt) na raiz, estruturando de forma sintética a proposta de valor, a escada de serviços, os links principais e as formas de contato para consumo direto por agentes de IA e crawlers semânticos.

---

## ⚡ 6. Micro-interações e Animações Nativas com `IntersectionObserver`

### Contexto
A página precisava de sensação de fluidez e dinamismo moderno (efeitos fade-up ao rolar, destaque escalonado de cards, contadores numéricos e carrossel de depoimentos), sem incorrer no peso de bibliotecas como AOS (Animate on Scroll), Swiper.js ou GSAP.

### Decisão & Racional
Toda a camada de interatividade em [`js/script.js`](file:///home/munraitoo13/Projects/guadalupesistemas-lp/js/script.js) foi construída usando APIs nativas do navegador:
- **`IntersectionObserver`:** Usado para observar a entrada de elementos no viewport e aplicar a classe `.revealed`, com cálculo de `transitionDelay` progressivo (*stagger*) para elementos filhos em grids.
- **`requestAnimationFrame`:** Utilizado para animação suave dos contadores numéricos na seção de métricas com curva de desaceleração *ease-out quad*.
- **Carrossel Nativo:** Transições de slides gerenciadas puramente por classes CSS `.active` e temporizador `setInterval` com pausa automática sob `:hover`.
