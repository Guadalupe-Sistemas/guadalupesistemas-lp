/**
 * Guadalupe Sistemas – Camada de eventos
 * ======================================================================
 * O GA4 do site (G-QPZ3J2WTTM) media apenas pageview. Este arquivo cobre o
 * funil inteiro: de onde a pessoa veio, o que ela clicou e onde ela desistiu.
 *
 * Todo evento vai para dois destinos, para funcionar hoje e depois do GTM:
 *   1. window.dataLayer  — lido pelo Google Tag Manager quando o container existir
 *   2. window.gtag       — o GA4 direto que já está instalado
 *
 * Carregue ANTES de js/script.js: sendToWhatsApp() usa window.GS.waUrl().
 *
 * Eventos de funil offline (qualified_lead, meeting_booked, proposal_sent,
 * customer_won) não são disparáveis pelo site — ver docs/analytics.md.
 */
(function () {
  'use strict';

  var WHATSAPP_PHONE = '5537998323232';
  var UTM_KEY = 'gs_utm';
  var UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];

  window.dataLayer = window.dataLayer || [];

  /* ==========================================================
     Contexto da página
     ========================================================== */

  /**
   * Agrupa a URL atual em uma das famílias de página. É a dimensão que
   * responde "qual tipo de página gera lead", e não apenas "qual URL".
   */
  function pageGroup() {
    var p = window.location.pathname;
    if (p === '/' || p === '/index.html') return 'home';
    if (p.indexOf('/para-clinicas') === 0) return 'clinicas';
    if (p.indexOf('/para-engenharia') === 0) return 'engenharia';
    if (p.indexOf('/diagnostico-de-ia') === 0) return 'diagnostico';
    if (p.indexOf('/solucoes') === 0) return 'solucao';
    if (p.indexOf('/casos') === 0) return 'caso';
    if (p.indexOf('/blog') === 0) return 'blog';
    return 'institucional';
  }

  var PAGE_GROUP = pageGroup();

  /** Primeiro segmento da URL — serve como origem padrão dos CTAs da página. */
  function pageSlug() {
    var seg = window.location.pathname.split('/').filter(Boolean);
    return seg.length ? seg[seg.length - 1].replace(/\.html$/, '') : 'home';
  }

  var PAGE_SLUG = pageSlug();

  /* ==========================================================
     UTM da sessão
     ========================================================== */

  /**
   * Guarda os UTM da primeira página vista. Sem isso, um visitante que chega
   * por um anúncio, lê um artigo e só então clica no WhatsApp aparece como
   * tráfego direto — a campanha perde o crédito pela conversa.
   */
  function captureUtm() {
    var params = new URLSearchParams(window.location.search);
    var found = {};
    var has = false;

    UTM_FIELDS.forEach(function (field) {
      var value = params.get(field);
      if (value) {
        found[field] = value;
        has = true;
      }
    });

    try {
      if (has) {
        sessionStorage.setItem(UTM_KEY, JSON.stringify(found));
        return found;
      }
      var stored = sessionStorage.getItem(UTM_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return found;
    }
  }

  var UTM = captureUtm();

  /* ==========================================================
     Disparo
     ========================================================== */

  /**
   * Envia um evento para o dataLayer e para o GA4.
   * @param {string} name  nome do evento (snake_case, padrão GA4)
   * @param {object} [params] dimensões adicionais
   */
  function track(name, params) {
    var payload = Object.assign(
      { page_group: PAGE_GROUP, page_slug: PAGE_SLUG },
      UTM,
      params || {}
    );

    window.dataLayer.push(Object.assign({ event: name }, payload));

    if (typeof window.gtag === 'function') {
      window.gtag('event', name, payload);
    }
  }

  /* ==========================================================
     WhatsApp com origem
     ========================================================== */

  /**
   * Monta a URL do WhatsApp já com a origem do clique na mensagem.
   * Usa encodeURIComponent: a versão anterior montava a query à mão com %0A
   * literal, então um "&", "#" ou "+" digitado pelo usuário truncava o texto.
   *
   * @param {string} origin   de onde veio o clique (ex.: "para-clinicas")
   * @param {string} [message] mensagem completa; se ausente, usa a saudação padrão
   */
  function waUrl(origin, message) {
    var body = message || 'Olá! Vim pelo site da Guadalupe Sistemas e gostaria de conversar.';
    var trail = '\n\n---\norigem: ' + (origin || PAGE_SLUG);

    if (UTM.utm_source) trail += ' | campanha: ' + UTM.utm_source;

    return 'https://wa.me/' + WHATSAPP_PHONE + '?text=' + encodeURIComponent(body + trail);
  }

  /**
   * Reescreve todo link wa.me da página para carregar a origem, exceto os que
   * já trazem ?text= montado por quem os criou.
   */
  function decorateWhatsAppLinks() {
    var links = document.querySelectorAll('a[href*="wa.me/"]');

    Array.prototype.forEach.call(links, function (link) {
      var origin = link.getAttribute('data-wa-origin') || PAGE_SLUG;

      if (link.href.indexOf('?text=') === -1) {
        link.href = waUrl(origin);
      }

      if (link.target === '_blank' && !link.rel) {
        link.rel = 'noopener noreferrer';
      }

      link.addEventListener('click', function () {
        track('click_whatsapp', { cta_origin: origin, link_text: (link.textContent || '').trim().slice(0, 60) });
      });
    });
  }

  /* ==========================================================
     Cliques comerciais
     ========================================================== */

  function trackCommercialClicks() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('a[href]') : null;
      if (!link) return;

      var href = link.getAttribute('href') || '';
      var origin = link.getAttribute('data-cta') || PAGE_SLUG;
      var label = (link.textContent || '').trim().slice(0, 60);

      if (href.indexOf('/diagnostico-de-ia') === 0) {
        track('click_diagnostico', { cta_origin: origin, link_text: label });
      } else if (href.indexOf('/casos/') === 0 && href !== '/casos/') {
        track('click_case', { cta_origin: origin, case_slug: href, link_text: label });
      }
    });
  }

  /* ==========================================================
     Profundidade de leitura
     ========================================================== */

  /** Dispara uma única vez quando o visitante chega a 90% da página. */
  function trackScrollDepth() {
    var fired = false;

    function onScroll() {
      if (fired) return;

      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      var progress = (window.scrollY || doc.scrollTop) / scrollable;
      if (progress < 0.9) return;

      fired = true;
      window.removeEventListener('scroll', onScroll);
      track('scroll_90');
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ==========================================================
     Formulário
     ========================================================== */

  /**
   * Instrumenta o formulário de múltiplas etapas sem duplicar a lógica de
   * navegação que vive em js/script.js: lê qual etapa ficou ativa depois do
   * clique, em vez de recalcular a validação aqui.
   */
  function trackForm() {
    var form = document.querySelector('.multi-step-form');
    if (!form) return;

    var started = false;
    var reached = {};

    form.addEventListener('input', markStart, true);
    form.addEventListener('change', markStart, true);

    function markStart() {
      if (started) return;
      started = true;
      track('form_start', { form_id: form.id || 'quote-form' });
    }

    form.addEventListener('click', function (e) {
      if (!e.target.closest || !e.target.closest('.form-next')) return;

      // A troca de etapa acontece no handler de js/script.js, que roda depois
      // deste. Lemos o resultado no próximo tick.
      setTimeout(function () {
        var active = form.querySelector('.form-step.active');
        if (!active) return;

        var step = active.getAttribute('data-step');
        if (!step || reached[step]) return;

        reached[step] = true;
        if (step === '2') track('form_step_1', { form_id: form.id });
        if (step === '3') track('form_step_2', { form_id: form.id });
      }, 0);
    });

    form.addEventListener('submit', function () {
      var solucao = form.querySelector('input[name="solucao"]:checked');
      track('generate_lead', {
        form_id: form.id || 'quote-form',
        lead_interest: solucao ? solucao.value : 'não informado',
        method: 'whatsapp'
      });
    });
  }

  /* ==========================================================
     Artigos
     ========================================================== */

  function trackArticleView() {
    if (PAGE_GROUP !== 'blog') return;

    var title = document.querySelector('.article-title');
    if (!title) return; // é o índice do blog, não um artigo

    var tag = document.querySelector('.article-hero .blog-tag');
    track('blog_article_view', {
      article_title: title.textContent.trim().slice(0, 100),
      article_category: tag ? tag.textContent.trim() : 'sem categoria'
    });
  }

  /* ==========================================================
     Boot
     ========================================================== */

  window.GS = {
    track: track,
    waUrl: waUrl,
    pageGroup: PAGE_GROUP,
    pageSlug: PAGE_SLUG,
    phone: WHATSAPP_PHONE
  };

  document.addEventListener('DOMContentLoaded', function () {
    decorateWhatsAppLinks();
    trackCommercialClicks();
    trackScrollDepth();
    trackForm();
    trackArticleView();
  });
})();
