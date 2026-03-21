const redirectIfHome = () => {
  if (window.location.pathname === '/' || window.location.pathname === '') {
    chrome.storage.local.get({ isActive: true }, (data) => {
      if (data.isActive) {
        window.location.replace('https://www.youtube.com/feed/subscriptions');
      }
    });
  }
};

// Check immediately on initial page load
redirectIfHome();

// Listen to YouTube's custom navigation events for SPA navigations
document.addEventListener('yt-navigate-start', redirectIfHome);
document.addEventListener('yt-navigate-finish', redirectIfHome);
