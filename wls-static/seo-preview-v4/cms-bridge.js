(function(){
  try {
    const raw = localStorage.getItem('wlsCmsConfig');
    if(!raw) return;
    const cfg = JSON.parse(raw);
    const setText=(id,v)=>{const el=document.getElementById(id); if(el && v) el.textContent=v;};
    const setHTML=(id,v)=>{const el=document.getElementById(id); if(el && v) el.innerHTML=v;};
    const setHref=(id,v)=>{const el=document.getElementById(id); if(el && v) el.href=v;};

    if(cfg.hero){
      setText('cmsHeroTitle', cfg.hero.title);
      setText('cmsHeroIntro', cfg.hero.intro);
      setText('cmsDealText', cfg.hero.dealText);
      setHref('cmsDealBtn', cfg.hero.dealUrl);
    }
    if(cfg.landingPages){
      setText('cmsCalciumIntro', cfg.landingPages.calciumIntro);
      setText('cmsB12Intro', cfg.landingPages.b12Intro);
      setText('cmsIronIntro', cfg.landingPages.ironIntro);
    }
    if(cfg.links && cfg.links.utmDealUrl){
      setHref('cmsDealBtn', cfg.links.utmDealUrl);
    }
  } catch(e){ console.warn('CMS config load failed', e); }
})();
