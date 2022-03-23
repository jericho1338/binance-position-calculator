(function () {
  const SUCCESS_MESSAGE = chrome.i18n.getMessage("saveSuccess");

  document.addEventListener("DOMContentLoaded", initOptions);
  document.getElementById("save").addEventListener("click", saveOptions);

  function initOptions() {
    const settingsUrl = chrome.runtime.getURL(
      "src/options/default-settings.json"
    );

    fetch(settingsUrl)
      .then((response) => response.json())
      .then((defaults) => {
        chrome.storage.sync.get(defaults, (values) => {
          const mergedSettings = Object.assign({}, defaults, values);
          setFormValues(mergedSettings);
        });
      });
  }

  function saveOptions() {
    const settings = getFormValues();
    chrome.storage.sync.set(settings, onSaveSuccess);
  }

  function setFormValues(values) {
    setInputVal("is-extension-active", values.IS_EXTENSION_ACTIVE, true);
    setInputVal("max-risk", values.MAX_RISK);
    setInputVal("taker-fee", values.TAKER_FEE);
    setInputVal("maker-fee", values.MAKER_FEE);
    setInputVal("portfolio-percentage", values.PORTFOLIO_PERCENTAGE);

    setRadioVal("rb-entry", values.ENTRY_ORDER_TYPE);
    setRadioVal("rb-tp", values.TP_ORDER_TYPE);
    setRadioVal("rb-sl", values.SL_ORDER_TYPE);

    setInputVal(
      "is-prevent-mb-wo-sl",
      values.IS_PREVENT_MARKET_BUY_WITHOUT_SL,
      true
    );
    setInputVal("is-hide-pnl", values.IS_HIDE_PNL, true);
    setInputVal("is-logger-active", values.IS_LOGGER_ACTIVE, true);
  }

  function getFormValues() {
    return {
      IS_EXTENSION_ACTIVE: getInputVal("is-extension-active", true),
      MAX_RISK: getInputVal("max-risk"),
      TAKER_FEE: getInputVal("taker-fee"),
      MAKER_FEE: getInputVal("maker-fee"),
      PORTFOLIO_PERCENTAGE: getInputVal("portfolio-percentage"),

      ENTRY_ORDER_TYPE: getRadioVal("rb-entry"),
      TP_ORDER_TYPE: getRadioVal("rb-tp"),
      SL_ORDER_TYPE: getRadioVal("rb-sl"),

      IS_PREVENT_MARKET_BUY_WITHOUT_SL: getInputVal(
        "is-prevent-mb-wo-sl",
        true
      ),
      IS_HIDE_PNL: getInputVal("is-hide-pnl", true),
      IS_LOGGER_ACTIVE: getInputVal("is-logger-active", true),
    };
  }

  function setInputVal(id, value, isCheckbox = false) {
    isCheckbox
      ? (document.getElementById(id).checked = value)
      : (document.getElementById(id).value = value);
  }

  function setRadioVal(name, value) {
    Array.from(document.querySelectorAll(`input[name="${name}"]`)).find(
      (input) => input.value === value
    ).checked = true;
  }

  function getRadioVal(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]`)).find(
      (input) => input.checked === true
    ).value;
  }

  function getInputVal(id, isCheckbox = false) {
    return isCheckbox
      ? document.getElementById(id).checked
      : document.getElementById(id).value;
  }

  function onSaveSuccess() {
    let statusElement = document.getElementById("status");
    statusElement.textContent = SUCCESS_MESSAGE;
  }
})();
