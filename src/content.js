const RULES = [
  {
    id: "ytHome",
    host: "www.youtube.com",
    test: () => window.location.pathname === '/' || window.location.pathname === '',
    redirect: "https://www.youtube.com/feed/subscriptions"
  },
  {
    id: "fbReels",
    host: "www.facebook.com",
    test: () => window.location.pathname.startsWith('/reel/'),
    redirect: "https://www.facebook.com/"
  },
  {
    id: "instagram",
    host: "www.instagram.com",
    test: () => window.location.pathname.startsWith('/reels/') || window.location.pathname.startsWith('/explore/'),
    redirect: "https://www.instagram.com/"
  }
];

const checkAndRedirect = () => {
  chrome.storage.local.get({ isActive: true, ytHome: true, fbReels: true, instagram: true }, (settings) => {
    // If master switch is off, do nothing
    if (!settings.isActive) return;

    for (const rule of RULES) {
      if (window.location.host === rule.host && settings[rule.id] && rule.test()) {
        window.location.replace(rule.redirect);
        break; // Only one rule can match at a time
      }
    }
  });
};

// 1. Check immediately on script load
checkAndRedirect();

// 2. YouTube's custom events for Single Page App (SPA) navigations
document.addEventListener('yt-navigate-start', checkAndRedirect);
document.addEventListener('yt-navigate-finish', checkAndRedirect);

// 3. Generic SPA URL watcher (perfect for React/FB) 
// We use a MutationObserver on document body to catch routing changes that History API handles internally
let _lastMonkeyURL = location.href; 
new MutationObserver(() => {
  const url = location.href;
  if (url !== _lastMonkeyURL) {
    _lastMonkeyURL = url;
    checkAndRedirect();
  }
}).observe(document, {subtree: true, childList: true});
