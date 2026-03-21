// popup.js
document.addEventListener('DOMContentLoaded', () => {
  const toggleSwitch = document.getElementById('toggleSwitch');

  // Load the initial state from Chrome storage, defaulting to true (on)
  chrome.storage.local.get({ isActive: true }, (data) => {
    toggleSwitch.checked = data.isActive;
  });

  // Listen for changes and save state back to Chrome storage
  toggleSwitch.addEventListener('change', (e) => {
    chrome.storage.local.set({ isActive: e.target.checked });
  });
});
