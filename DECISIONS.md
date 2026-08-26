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

---

## 🧱 7. Arquitetura Multi-Página por Nicho (Agosto/2026)

### Contexto
Uma auditoria pública de 25/08/2026 concluiu que o site funcionava como apresentação institucional, não como máquina de aquisição. Toda a proposta vivia em uma única URL, competindo com o mercado inteiro por termos genéricos como "IA para empresas". Quem busca "automação para clínica médica" tem intenção diferente de quem busca "IA para escritório de engenharia", mas ambos caíam no mesmo discurso.

### Alternativas Consideradas
1. **Manter a página única e otimizar o texto:** barato, mas o Google só consegue ranquear uma URL para um conjunto de termos. Impossível ter título, descrição e conteúdo próprios por nicho.
2. **Landing pages isoladas para campanha paga:** resolveria o tráfego pago, mas não constrói autoridade orgânica nem aproveita links internos.
3. **Arquitetura multi-página por nicho e por solução:** cada intenção de busca ganha sua URL, com título, descrição e conteúdo próprios.

### Decisão & Racional
Adotada a **arquitetura multi-página**, de 5 para 24 URLs, organizada em verticais (`/para-clinicas/`, `/para-engenharia/`), soluções (`/solucoes/*`), prova (`/casos/*`) e conteúdo (`/blog/*`).

- **Autoridade em termos específicos:** a aposta é em "automação de WhatsApp para clínicas" e "assistente de IA para normas técnicas", não em "inteligência artificial".
- **Caminho de conversão explícito:** artigo → página comercial → diagnóstico → WhatsApp. Cada artigo linka a solução correspondente no meio do texto.
- **URLs em pasta** (`/para-clinicas/`, não `/para-clinicas.html`): legíveis, estáveis e sem depender de configuração de servidor. As 4 URLs `.html` antigas ganharam 301 em `vercel.json`.

---

## 🧩 8. Fonte Única de Nav e Footer sem Build Step

### Contexto
A regra Zero-Build (decisão 1) implica HTML literal em cada arquivo. Com 5 páginas isso já havia degradado: os artigos tinham 6 links de menu e CTA de WhatsApp enquanto a política tinha 7 links e CTA de diagnóstico — o menu já não era o mesmo em todo o site. Com 24 páginas, manter à mão é garantia de divergência e de link quebrado.

### Alternativas Consideradas
1. **Continuar copiando à mão:** zero ferramenta nova, mas mudar um item de menu vira 24 edições manuais.
2. **Injetar nav e footer via JavaScript em runtime:** fonte única e sem build, porém os links do rodapé deixariam de existir no HTML servido — enfraquecendo exatamente a malha de links internos que a arquitetura nova quer construir.
3. **Adotar um gerador de site estático:** resolveria, mas contraria frontalmente a decisão 1.
4. **HTML literal + sincronização por script local:** o HTML publicado continua completo; a duplicação passa a ser gerada, não digitada.

### Decisão & Racional
Adotada a **opção 4**. `partials/nav.html` e `partials/footer.html` são a fonte única, propagada por `node tools/sync-layout.mjs` para blocos delimitados por `<!-- gs:nav:start -->` e `<!-- gs:footer:start -->`.

- **A regra Zero-Build permanece intacta:** os scripts em `tools/` são Node puro, sem `package.json` e sem dependências. Rodam na máquina do desenvolvedor, nunca no deploy — `.vercelignore` os remove do publish. A Vercel continua servindo arquivos estáticos exatamente como estão no repositório.
- **SEO preservado:** o HTML entregue ao crawler continua com nav e footer completos.
- **Verificação junto:** a mesma base sustenta `check-links`, `check-seo`, `check-quality` e `build-sitemap`.

---

## 📊 9. Camada de Eventos e Consent Mode v2

### Contexto
O GA4 (`G-QPZ3J2WTTM`) já estava instalado, mas media apenas pageview. Não havia como saber qual página gera lead, onde o visitante abandona o formulário, ou de onde vem quem chama no WhatsApp — só volume de tráfego. Além disso, o carregamento adiado em 5 segundos descartava a visita de quem saía rápido, subnotificando o próprio pageview.

### Alternativas Consideradas
1. **Instalar o GTM e configurar tudo pela interface:** flexível, mas adiciona um container de terceiros no caminho crítico e transfere a lógica para fora do repositório.
2. **Chamar `gtag('event', ...)` espalhado pelo HTML:** simples, porém espalha regra de negócio por 24 arquivos.
3. **Uma camada própria que alimenta `dataLayer` e `gtag`:** centralizada, versionada e compatível com GTM quando ele existir.

### Decisão & Racional
Criado `js/analytics.js`, que publica `window.GS` e envia cada evento para os dois destinos.

- **Consent Mode v2** é declarado com tudo negado antes de qualquer tag, mantendo conformidade sem perder a modelagem de conversão do Google.
- **O atraso de 5s foi removido** para quem já consentiu.
- **`GTM_ID` fica vazio por padrão:** o site funciona só com GA4; preencher a constante ativa o container sem tocar em mais nada.
- **Nomes de eventos seguem o padrão do GA4** (`generate_lead`, `form_start`) em vez dos nomes propostos no `PLAN.md` (`lead_converted_whatsapp`, `form_step_1_selected`). `generate_lead` é evento recomendado pelo GA4 e já vem com relatórios prontos; nomes personalizados exigiriam configuração manual sem ganho.
- **Origem do lead:** todo link `wa.me` é assinado com a página de origem, e os UTM da sessão ficam em `sessionStorage` — sem isso, quem chega por anúncio e só depois chama no WhatsApp aparece como tráfego direto.

---

## 🧾 10. Prova Social Verificável

### Contexto
A auditoria apontou como o defeito mais grave a prova social fabricada: três depoimentos assinados por "Cliente Satisfeito" com retratos de banco de imagem, uma foto de stock apresentada como a equipe, e contadores que exibiam `0` para qualquer leitura sem JavaScript. Para uma empresa que vende software e trata dados de clínicas, isso corrói exatamente a confiança que o site tenta construir.

### Decisão & Racional
Estabelecida a regra de **nunca publicar prova social não verificável**.

- Nome, cargo, empresa e foto de depoimento foram removidos. Restou o relato do resultado, atribuído apenas ao segmento.
- Nenhuma foto de banco de imagem representa pessoas ou equipe da Guadalupe.
- Onde falta dado real, o texto visível é honesto ("volume não medido pela clínica") e a pendência fica em comentário HTML `<!-- TODO: confirmar com o cliente — ... -->`, jamais visível ao visitante. `tools/check-quality.mjs` participa dessa disciplina verificando que o `FAQPage` estruturado corresponda palavra por palavra à FAQ exibida.
- Os contadores passaram a trazer o valor final no HTML (`90%`), com o JavaScript animando de zero até ele — progressive enhancement em vez de dependência de script.

Publicar depoimento nominal exige nome real, cargo, empresa, texto aprovado e autorização de uso de imagem por escrito.

---

## 🧭 11. Cobertura Semântica sem Canibalização (Agosto/2026)

### Contexto
Uma segunda auditoria de SEO, posterior à reestruturação da decisão 7, apontou três lacunas: o H1 da home vendia um benefício ("Automação e IA para eliminar tarefas repetitivas") sem deixar inequívoco **o que a empresa é**; não havia URL para as buscas de categoria ("inteligência artificial para empresas", "desenvolvimento de sistemas", "quanto custa desenvolver um sistema"); e a presença geográfica era só implícita, mencionada em duas frases perdidas apesar de a operação ser toda do DDD 37.

A auditoria propunha, junto com isso, criar cerca de vinte páginas na raiz — entre elas `/agentes-de-ia/`, `/automacao-de-processos/`, `/sistemas-sob-medida/`, `/aplicativos/` e `/solucoes-para-clinicas/`.

### Alternativas Consideradas
1. **Criar todas as URLs propostas.** Aumentaria a superfície indexada de imediato, mas quatro delas seriam quase idênticas a páginas criadas semanas antes sob `/solucoes/*`, e uma a `/para-clinicas/`. Duas URLs disputando o mesmo termo dividem sinal, e o Google escolhe uma — normalmente não a que o site preferia.
2. **Promover `/solucoes/*` para a raiz**, com 301 das antigas. URLs mais curtas, mas jogaria fora o histórico de URLs publicadas há poucas semanas e dissolveria o hub `/solucoes/`.
3. **Reforçar o que existe e criar página nova só onde a intenção é distinta.** Zero duplicata, zero redirecionamento novo.

### Decisão & Racional
Adotada a **opção 3**. O site foi de 24 para 37 URLs, sem nenhuma competindo com outra.

- **Página nova só para intenção sem dono.** Foram criadas cinco: `/inteligencia-artificial-para-empresas/` e `/desenvolvimento-de-sistemas/` cobrem a categoria (o guarda-chuva), enquanto `/solucoes/agentes-de-ia/` e `/solucoes/sistemas-sob-medida/` continuam cobrindo a oferta. `/automacao-de-whatsapp/` cobre o caso de uso pelo canal, distinto da tecnologia. `/quanto-custa-um-sistema-personalizado/` não tinha equivalente e é a maior intenção de compra do site. `/automacao-e-sistemas-em-minas-gerais/` cobre a busca geográfica.
- **O que já existia foi reforçado, não duplicado.** Cada página de solução e as duas verticais ganharam um `<h2>` que cobre os sinônimos usados no mercado ("automação empresarial", "software personalizado", "sistemas para clínicas") e duas perguntas de FAQ, com o `FAQPage` espelhado.
- **O H1 da home passou a definir a entidade** — "IA, automação e sistemas sob medida para empresas" — em vez de prometer um benefício. Não por acúmulo de palavra-chave: por ser a frase que responde "o que essa empresa faz?" para o leitor e para o buscador ao mesmo tempo. O subtítulo nomeia a Guadalupe e mantém a qualificação de público.
- **Uma página geográfica, não dez.** A regra 10 vale para geografia: página "cidade + palavra-chave" praticamente igual às outras é conteúdo artificial. Foi criada uma página regional com conteúdo genuíno (contexto econômico do Centro-Oeste mineiro, tipos de projeto, como funciona o atendimento remoto, incluindo suas desvantagens), e as cidades aparecem dentro do texto como área atendida. Páginas por cidade ficam bloqueadas até haver cliente real da cidade para citar — registrado como Fase 6 no [`PLAN.md`](./PLAN.md).
- **`Organization` virou `ProfessionalService`** com `areaServed` explícito. `address` e `addressLocality` continuam ausentes porque a cidade-sede ainda é pendência do cliente: melhor não declarar do que declarar errado.
- **Três clusters de conteúdo, com links nos dois sentidos.** Oito artigos novos, cada um linkando o pilar no meio do texto e recebendo link de volta pelo "Veja também". As páginas que falam de preço linkam entre si em vez de repetir conteúdo — o mesmo cuidado com canibalização aplicado dentro do blog. Foi por isso que o artigo previsto "Sistema próprio ou software pronto?" foi trocado por "Como escolher uma empresa de desenvolvimento de sistemas": a comparação já era o miolo de um artigo publicado.
- **Nenhuma faixa de preço de projeto foi publicada.** A página de custo explica os oito fatores que formam o valor e o método de orçamento, e só publica a única cifra verificável — o diagnóstico a partir de R$ 2.500. Faixa por porte de projeto ficou em `<!-- TODO -->`. Pela mesma regra, os blocos "Como esse número foi medido" nas páginas de caso dizem o que é verificável hoje e deixam período e base de cálculo pendentes, em vez de inventar uma metodologia plausível.
