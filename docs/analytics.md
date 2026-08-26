# Medição — Guadalupe Sistemas

Como o site mede o funil, o que já está pronto e o que depende de você.

---

## O que existe hoje

| Peça | Estado | Onde |
|---|---|---|
| GA4 `G-QPZ3J2WTTM` | ✅ ativo | `js/cookie-consent.js` |
| Consent Mode v2 | ✅ ativo | `js/cookie-consent.js` |
| Banner de consentimento LGPD | ✅ ativo | `js/cookie-consent.js` |
| Camada de eventos | ✅ ativa | `js/analytics.js` |
| Google Tag Manager | ⬜ falta o ID | `js/cookie-consent.js` → `GTM_ID` |
| Google Search Console | ⬜ falta verificar o domínio | — |

O site funciona sem o GTM. Ele é opcional e serve para você criar e editar tags
sem mexer em código.

---

## Ligar o Google Tag Manager

1. Crie um container em <https://tagmanager.google.com> — tipo **Web**, domínio
   `guadalupesistemas.com.br`.
2. Copie o ID no formato `GTM-XXXXXXX`.
3. Abra `js/cookie-consent.js` e cole em `GTM_ID`:

   ```js
   var GTM_ID = 'GTM-XXXXXXX';
   ```

4. Faça commit e push. A Vercel publica sozinha.

Enquanto `GTM_ID` estiver vazio, só o GA4 direto carrega — nada quebra.

### Dentro do GTM

Para cada evento da tabela abaixo, crie um acionador **Evento personalizado**
com o nome exato e uma tag **Evento do GA4** apontando para `G-QPZ3J2WTTM`.

---

## Ligar o Search Console

1. Acesse <https://search.google.com/search-console> e adicione a propriedade
   de **domínio** `guadalupesistemas.com.br` (verificação por registro DNS TXT
   na Vercel ou no seu registrador).
2. Em **Sitemaps**, envie `https://guadalupesistemas.com.br/sitemap.xml`.
3. Vincule a propriedade ao GA4 em *Administrador → Links do Search Console*.

Acompanhe depois: impressões, cliques, CTR, posição média, consultas, páginas,
cobertura de indexação e Core Web Vitals.

---

## Eventos disparados pelo site

Todos vão para `window.dataLayer` **e** para `gtag`, então funcionam com ou sem
GTM. Cada evento carrega automaticamente `page_group`, `page_slug` e os UTM
capturados na primeira página da sessão.

| Evento | Quando dispara | Parâmetros próprios |
|---|---|---|
| `page_view` | GA4 nativo, em toda página | — |
| `scroll_90` | visitante chega a 90% da página | — |
| `click_whatsapp` | clique em qualquer link `wa.me` | `cta_origin`, `link_text` |
| `click_diagnostico` | clique em link para `/diagnostico-de-ia/` | `cta_origin`, `link_text` |
| `click_case` | clique em um caso específico | `case_slug`, `cta_origin` |
| `blog_article_view` | abertura de um artigo (não do índice) | `article_title`, `article_category` |
| `form_start` | primeira interação com o formulário | `form_id` |
| `form_step_1` | avançou da etapa 1 para a 2 | `form_id` |
| `form_step_2` | avançou da etapa 2 para a 3 | `form_id` |
| `generate_lead` | envio do formulário | `lead_interest`, `method` |

### Dimensão `page_group`

Responde "que **tipo** de página gera lead", e não apenas qual URL:

`home` · `clinicas` · `engenharia` · `diagnostico` · `solucao` · `caso` · `blog` · `institucional`

Registre-a como **dimensão personalizada** no GA4
(*Administrador → Definições personalizadas → Criar dimensão personalizada*,
escopo de evento, parâmetro `page_group`). Sem isso ela não aparece nos relatórios.

### Marcar as conversões

No GA4, em *Administrador → Eventos*, marque como evento-chave:

- `generate_lead` — conversão principal
- `click_whatsapp` — conversão secundária

---

## Origem do lead no WhatsApp

Todo link `wa.me` é reescrito em tempo de execução por `js/analytics.js` para
carregar a origem no corpo da mensagem:

```
---
origem: para-clinicas | campanha: google_ads
```

A origem vem do atributo `data-wa-origin` do link; sem ele, usa o último
segmento da URL. Os UTM ficam em `sessionStorage`, então um visitante que chega
por anúncio, lê um artigo e só depois clica no WhatsApp continua atribuído à
campanha — sem isso ele apareceria como tráfego direto.

Ao criar um link novo:

```html
<a href="https://wa.me/5537998323232" target="_blank" rel="noopener noreferrer"
   data-wa-origin="para-clinicas-hero">Falar no WhatsApp</a>
```

---

## Eventos que o site **não** dispara

Estes acontecem depois da conversa e precisam vir do seu processo comercial, não
do navegador:

| Evento | Como registrar |
|---|---|
| `qualified_lead` | importação offline no GA4 ou marcação no CRM |
| `meeting_booked` | idem |
| `proposal_sent` | idem |
| `customer_won` | idem |

Caminho no GA4: *Administrador → Importação de dados → Dados de eventos offline*.
Exige guardar o `client_id` do GA4 junto do lead — o que hoje não acontece,
porque o formulário só abre o WhatsApp e não grava nada. Enquanto isso não
mudar, o mais prático é registrar essas etapas numa planilha ou CRM e cruzar
manualmente com o volume de `generate_lead`.

---

## Conferindo se está funcionando

1. Abra o site, aceite os cookies.
2. DevTools → Console → `window.dataLayer`.
3. Preencha o formulário e confira a sequência:
   `form_start` → `form_step_1` → `form_step_2` → `generate_lead`.
4. Role até o fim de uma página → `scroll_90`.
5. No GA4, use *Administrador → DebugView* (com a extensão
   [GA Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna))
   para ver os eventos chegando em tempo real.

Lembre: com o consentimento recusado nada é enviado — é o comportamento correto,
não um defeito.
