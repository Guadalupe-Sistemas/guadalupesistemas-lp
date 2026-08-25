/**
 * Guadalupe Sistemas – Consentimento de Cookies + Google Analytics
 * ==================================================================
 * Mostra um banner de consentimento no primeiro acesso e só ativa a medição
 * depois que o visitante aceita. A escolha fica salva no localStorage.
 *
 * Usa Consent Mode v2: as tags carregam com todo consentimento NEGADO por
 * padrão e são liberadas no "Aceitar". Isso mantém a conformidade sem perder
 * a modelagem de conversão do Google.
 *
 * ---------------------------------------------------------------------------
 * PARA LIGAR O GOOGLE TAG MANAGER
 *   1. Crie um container em https://tagmanager.google.com (tipo: Web)
 *   2. Copie o ID no formato GTM-XXXXXXX
 *   3. Cole em GTM_ID abaixo, no lugar da string vazia
 *   4. Dentro do GTM, crie um acionador "Evento personalizado" para cada
 *      evento de js/analytics.js e marque generate_lead como conversão
 * Enquanto GTM_ID estiver vazio, só o GA4 direto é carregado — o site
 * funciona normalmente. Ver docs/analytics.md.
 * ---------------------------------------------------------------------------
 */
(function () {
  'use strict';

  var CONSENT_KEY = 'gs_cookie_consent';
  var GA_ID = 'G-QPZ3J2WTTM';
  var GTM_ID = ''; // ex.: 'GTM-XXXXXXX'

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  /**
   * Consent Mode v2 — precisa rodar antes de qualquer tag do Google.
   * security_storage fica sempre concedido: é o que protege contra fraude.
   */
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 500
  });

  var tagsLoaded = false;

  /** Injeta GA4 e, se configurado, o container do GTM. */
  function loadTags() {
    if (tagsLoaded) return;
    tagsLoaded = true;

    var ga = document.createElement('script');
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    ga.async = true;
    document.head.appendChild(ga);

    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });

    if (GTM_ID) {
      window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
      var gtm = document.createElement('script');
      gtm.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
      gtm.async = true;
      document.head.appendChild(gtm);
    }
  }

  /** Libera as categorias que o visitante aceitou. */
  function grantConsent() {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      functionality_storage: 'granted',
      personalization_storage: 'granted'
    });
  }

  function getConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (e) {
      /* localStorage indisponível — segue sem persistir */
    }
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-consent-banner');
    if (!banner) return;
    banner.classList.remove('visible');
    setTimeout(function () {
      banner.remove();
    }, 300);
  }

  function buildBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.className = 'cookie-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Aviso de cookies');

    banner.innerHTML = [
      '<div class="cookie-consent-content">',
      '  <p>Usamos cookies e o Google Analytics para entender como você usa o site e melhorar sua experiência.',
      '  Você pode aceitar ou recusar. Saiba mais na nossa',
      '  <a href="/politica-de-privacidade/">Política de Privacidade</a>.</p>',
      '  <div class="cookie-consent-actions">',
      '    <button type="button" class="btn btn-ghost cookie-consent-reject">Recusar</button>',
      '    <button type="button" class="btn btn-primary-violet cookie-consent-accept">Aceitar</button>',
      '  </div>',
      '</div>'
    ].join('\n');

    document.body.appendChild(banner);

    banner.querySelector('.cookie-consent-accept').addEventListener('click', function () {
      setConsent('accepted');
      hideBanner();
      grantConsent();
      loadTags();
    });

    banner.querySelector('.cookie-consent-reject').addEventListener('click', function () {
      setConsent('rejected');
      hideBanner();
    });

    requestAnimationFrame(function () {
      banner.classList.add('visible');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var consent = getConsent();

    if (consent === 'accepted') {
      // Sem atraso: a versão anterior só carregava o GA após 5s ou a primeira
      // interação, então todo visitante que saía rápido sumia do relatório.
      grantConsent();
      loadTags();
      return;
    }

    if (consent === 'rejected') return;

    buildBanner();
  });
})();
