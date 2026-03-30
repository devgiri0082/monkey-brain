document.addEventListener('DOMContentLoaded', () => {
  const isActiveToggle = document.getElementById('isActive');
  const fbReelsToggle = document.getElementById('fbReels');
  const igReelsToggle = document.getElementById('igReels');
  const ytHomeToggle = document.getElementById('ytHome');
  const togglesGroup = document.getElementById('individual-toggles');

  // Load the initial state from Chrome storage
  chrome.storage.local.get({ isActive: true, fbReels: true, igReels: true, ytHome: true }, (data) => {
    isActiveToggle.checked = data.isActive;
    fbReelsToggle.checked = data.fbReels;
    igReelsToggle.checked = data.igReels;
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

  igReelsToggle.addEventListener('change', (e) => {
    chrome.storage.local.set({ igReels: e.target.checked });
  });

  ytHomeToggle.addEventListener('change', (e) => {
    chrome.storage.local.set({ ytHome: e.target.checked });
  });
});
