const SETTINGS_URL = "src/options/default-settings.json";

const loadSettings = async () => {
  const defaults = await loadDefaultSettings();
  const userSettings = await loadUserSettings(defaults);
  return userSettings;
};

const loadDefaultSettings = async () => {
  return fetch(chrome.runtime.getURL("src/options/default-settings.json"))
    .then((response) => response.json())
    .then((res) => res);
};

const loadUserSettings = async (defaults) => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(defaults, (settings) => {
      resolve(settings);
    });
  });
};

export { loadSettings };
