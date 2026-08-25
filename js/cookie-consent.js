/**
 * Guadalupe Sistemas – Consentimento de Cookies + Google Analytics
 * ==================================================================
 * Mostra um banner de consentimento no primeiro acesso e só carrega o
 * Google Analytics (gtag.js) depois que o visitante aceita. A escolha
 * fica salva no localStorage para o banner não aparecer de novo.
 */
(function () {
  const CONSENT_KEY = 'gs_cookie_consent';
  const GA_ID = 'G-QPZ3J2WTTM';
  const INTERACTION_EVENTS = ['scroll', 'mousemove', 'touchstart', 'click'];

  function loadGA() {
    if (window.gsGaLoaded) return;
    window.gsGaLoaded = true;

    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  /**
   * Carrega o GA de forma lazy (no primeiro scroll/click/toque ou após 5s),
   * igual ao comportamento original — só chamado quando já há consentimento.
   */
  function scheduleGA() {
    const trigger = () => {
      INTERACTION_EVENTS.forEach(e => window.removeEventListener(e, trigger));
      loadGA();
    };
    INTERACTION_EVENTS.forEach(e => window.addEventListener(e, trigger, { once: true, passive: true }));
    setTimeout(trigger, 5000);
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
    const banner = document.getElementById('cookie-consent-banner');
    if (!banner) return;
    banner.classList.remove('visible');
    setTimeout(() => banner.remove(), 300);
  }

  function buildBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.className = 'cookie-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Aviso de cookies');

    banner.innerHTML = `
      <div class="cookie-consent-content">
        <p>Usamos cookies e o Google Analytics para entender como você usa o site e melhorar sua experiência.
        Você pode aceitar ou recusar. Saiba mais na nossa
        <a href="politica-de-privacidade.html">Política de Privacidade</a>.</p>
        <div class="cookie-consent-actions">
          <button type="button" class="btn btn-ghost cookie-consent-reject">Recusar</button>
          <button type="button" class="btn btn-primary-violet cookie-consent-accept">Aceitar</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    banner.querySelector('.cookie-consent-accept').addEventListener('click', () => {
      setConsent('accepted');
      hideBanner();
      loadGA();
    });

    banner.querySelector('.cookie-consent-reject').addEventListener('click', () => {
      setConsent('rejected');
      hideBanner();
    });

    requestAnimationFrame(() => banner.classList.add('visible'));
  }

  document.addEventListener('DOMContentLoaded', () => {
    const consent = getConsent();

    if (consent === 'accepted') {
      scheduleGA();
      return;
    }

    if (consent === 'rejected') {
      return;
    }

    buildBanner();
  });
})();
