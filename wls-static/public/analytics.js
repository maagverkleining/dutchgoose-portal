(function () {
  var cfg = window.WLS_SITE_CONFIG || {};
  var measurementId = cfg.ga4MeasurementId || "";

  function isHttpUrl(value) {
    return /^https?:\/\//i.test(value || "");
  }

  function textOf(el) {
    return (el && el.textContent ? el.textContent : "").replace(/\s+/g, " ").trim().slice(0, 120);
  }

  function domainOf(url) {
    try {
      return new URL(url).hostname;
    } catch {
      return "";
    }
  }

  function ensureGtag(id) {
    if (!id) return false;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(script);

    window.gtag("js", new Date());
    window.gtag("config", id, {
      anonymize_ip: true,
      transport_type: "beacon"
    });

    return true;
  }

  function detectEventType(anchor) {
    var explicit = anchor.getAttribute("data-track");
    if (explicit) return explicit;

    var id = anchor.id || "";
    var cls = anchor.className || "";
    var href = anchor.getAttribute("href") || "";

    if (id === "cmsDealBtn" || /\b(buy|table-buy)\b/.test(cls)) return "affiliate_click";
    if (isHttpUrl(href) && domainOf(href) && domainOf(href) !== window.location.hostname) return "outbound_click";
    return "internal_click";
  }

  function bindClickTracking() {
    document.addEventListener("click", function (evt) {
      var target = evt.target;
      var anchor = target && target.closest ? target.closest("a[href]") : null;
      if (!anchor) return;

      var href = anchor.getAttribute("href") || "";
      var eventType = detectEventType(anchor);

      if (eventType === "internal_click" && href.startsWith("#")) {
        if (window.gtag) {
          window.gtag("event", "internal_nav_click", {
            page_path: window.location.pathname,
            link_url: href,
            link_text: textOf(anchor),
            placement: anchor.getAttribute("data-placement") || "anchor"
          });
        }
        return;
      }

      if (!window.gtag) return;

      window.gtag("event", eventType, {
        page_path: window.location.pathname,
        page_title: document.title,
        link_url: href,
        link_domain: isHttpUrl(href) ? domainOf(href) : window.location.hostname,
        link_text: textOf(anchor),
        placement: anchor.getAttribute("data-placement") || "anchor",
        supplier: anchor.getAttribute("data-supplier") || "",
        product_id: anchor.getAttribute("data-product-id") || ""
      });
    }, { passive: true });
  }

  if (!ensureGtag(measurementId)) {
    console.info("[analytics] GA4 uitgeschakeld: vul ga4MeasurementId in /public/site-config.js");
    return;
  }

  bindClickTracking();
})();
