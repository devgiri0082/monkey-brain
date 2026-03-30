document.addEventListener('DOMContentLoaded', () => {
  const isActiveToggle = document.getElementById('isActive');
  const fbReelsToggle = document.getElementById('fbReels');
  const ytHomeToggle = document.getElementById('ytHome');
  const togglesGroup = document.getElementById('individual-toggles');

  // Load the initial state from Chrome storage
  chrome.storage.local.get({ isActive: true, fbReels: true, ytHome: true }, (data) => {
    isActiveToggle.checked = data.isActive;
    fbReelsToggle.checked = data.fbReels;
    ytHomeToggle.checked = data.ytHome;
    
    updateGroupState(data.isActive);
  });

  const updateGroupState = (isActive) => {
    if (isActive) {
      togglesGroup.classList.remove('disabled-group');
    } else {
      togglesGroup.classList.add('disabled-group');
    }
  };

  // Listen for changes and save state back to Chrome storage
  isActiveToggle.addEventListener('change', (e) => {
    const isActive = e.target.checked;
    chrome.storage.local.set({ isActive });
    updateGroupState(isActive);
  });

  fbReelsToggle.addEventListener('change', (e) => {
    chrome.storage.local.set({ fbReels: e.target.checked });
  });

  ytHomeToggle.addEventListener('change', (e) => {
    chrome.storage.local.set({ ytHome: e.target.checked });
  });
});
