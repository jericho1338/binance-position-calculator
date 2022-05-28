(async () => {
  const html = await import(`./html.js`);
  const math = await import(`./math.js`);
  const helpers = await import(`./helpers.js`);
  const settings = await import(`./settings.js`);

  const ORDER_FORM_QUERY = `div[name=orderForm]`;
  const INPUT_PRICE_QUERY = `input[id^="limitPrice"]`;
  const POSITION_SIZE_QUERY = `input[id^="unitAmount"]`;
  const TAKE_PROFIT_QUERY = `input[id^="takeProfitStopPrice"]`;
  const STOP_LOSS_QUERY = `input[id^="stopLossStopPrice"]`;
  const LAST_PRICE_BTN_QUERY = `div[data-bn-type='text']`;
  const UOM_QUERY = `label[data-testid='unit-select-button']`;
  const LAST_PRICE_QUERY = `.ticker-wrap .draggableHandle`;
  const TAB_MARKET_QUERY = `#tab-MARKET > .active`;
  const TAB_LIMIT_QUERY = `#tab-LIMIT > .active`;

  let _SETTINGS = {};
  let priceObserver = undefined;
  let dialog = html.initDialog();

  // listening for changes on settings
  chrome.storage.onChanged.addListener(() => {
    initCalculator();
  });

  html.observeHtml(
    ORDER_FORM_QUERY,
    STOP_LOSS_QUERY,
    initCalculator,
    terminateCalculator
  );

  initCalculator();

  async function initCalculator() {
    _SETTINGS = await settings.loadSettings(settings);

    if (_SETTINGS.IS_EXTENSION_ACTIVE) {
      if (_SETTINGS.IS_HIDE_PNL) html.hidePnl(_SETTINGS.IS_HIDE_PNL);

      const isStopLossLoaded = document.querySelector(STOP_LOSS_QUERY);
      const isLimitTabSelected = document.querySelector(TAB_LIMIT_QUERY);
      const isMarketTabSelected = document.querySelector(TAB_MARKET_QUERY);

      if (isStopLossLoaded && isLimitTabSelected) {
        terminateDOMLastPriceObserver();
        initLimitCalculator();
      } else if (isStopLossLoaded && isMarketTabSelected) {
        initMarketCalculator();
        initDOMLastPriceObserver();
      }

	  if(isStopLossLoaded)
	  	html.initAutoTPCheckbox(isStopLossLoaded, _SETTINGS);
    }
  }

  function initDOMLastPriceObserver() {
    priceObserver = new MutationObserver((mutations) => {
      mutations[0].type == "characterData" && setMarketPosAndTP();
    });

    priceObserver.observe(document.querySelector(LAST_PRICE_QUERY), {
      characterData: true,
      subtree: true,
    });
  }

  function terminateDOMLastPriceObserver() {
    priceObserver && priceObserver.disconnect();
  }

  function terminateCalculator() {
    terminateDOMLastPriceObserver();
    html.removeLogWindow();
  }

  function setMarketPosAndTP() {
	setMarketPosSize();
	if(_SETTINGS.IS_SET_AUTO_TP)
		setTakeProfit(false);
  }

  function initMarketCalculator() {
    let slInput = document.querySelector(STOP_LOSS_QUERY);
    let tpInput = document.querySelector(TAKE_PROFIT_QUERY);

    let buyMarketBtn = Array.from(document.querySelectorAll("button")).find(
      (b) => b.innerText === "Buy/Long"
    );
    let sellMarketBtn = Array.from(document.querySelectorAll("button")).find(
      (b) => b.innerText === "Sell/Short"
    );

    slInput.addEventListener("keyup", setMarketPosAndTP);
    tpInput.addEventListener("keyup", setMarketPosSize);

    buyMarketBtn.onclick = buySellOnClick;
    sellMarketBtn.onclick = buySellOnClick;

    // run initial calculation if we change plugin settings during the trade
    setMarketPosAndTP()

    function buySellOnClick(e) {
		setMarketPosAndTP();
      if (
        _SETTINGS.IS_PREVENT_MARKET_BUY_WITHOUT_SL &&
        !helpers.isNumber(parseFloat(slInput.value))
      ) {
        e.preventDefault();
        dialog.open("NO STOP LOSS NO TRADE!");
      }
    }
  }

  function setMarketPosSize() {
    let entry = parseFloat(document.querySelector(LAST_PRICE_QUERY).innerText);
    let unitOfMeasure = document.querySelector(UOM_QUERY).innerText;
    setPosSizeInput(unitOfMeasure, entry);
  }

  function setLimitPosAndTP() {
	setLimitPosSize();
	if(_SETTINGS.IS_SET_AUTO_TP)
		setTakeProfit(true);
  }

  function initLimitCalculator() {
    let lastPriceBtn = Array.from(
      document
        .querySelector(ORDER_FORM_QUERY)
        .querySelectorAll(LAST_PRICE_BTN_QUERY)
    ).find((c) => c.innerHTML == "Last");
    let entryInput = document.querySelector(INPUT_PRICE_QUERY);
    let slInput = document.querySelector(STOP_LOSS_QUERY);
    let tpInput = document.querySelector(TAKE_PROFIT_QUERY);

    entryInput.addEventListener("keyup", setLimitPosAndTP);
    slInput.addEventListener("keyup", setLimitPosAndTP);
    tpInput.addEventListener("keyup", setLimitPosSize);
    lastPriceBtn.addEventListener("click", setLimitPosAndTP);

    // run initial calc if we change settings during the trade
    setLimitPosAndTP();
  }

  function setLimitPosSize() {
    let entry = parseFloat(document.querySelector(INPUT_PRICE_QUERY).value);
    let unitOfMeasure = document.querySelector(UOM_QUERY).innerText;
    setPosSizeInput(unitOfMeasure, entry);
  }

  function setPosSizeInput(unitOfMeasure, entry) {
    let maxRisk = _SETTINGS.MAX_RISK;
    let mFee = _SETTINGS.MAKER_FEE;
    let tFee = _SETTINGS.TAKER_FEE;
    let portfolioPercentage = _SETTINGS.PORTFOLIO_PERCENTAGE;
    let isLogger = _SETTINGS.IS_LOGGER_ACTIVE;
    let isSetPosSize = _SETTINGS.IS_SET_POS_SIZE;

    let entryOrderType = _SETTINGS.ENTRY_ORDER_TYPE;
    let tpOrderType = _SETTINGS.TP_ORDER_TYPE;
    let slOrderType = _SETTINGS.SL_ORDER_TYPE;

    let stopLoss = parseFloat(document.querySelector(STOP_LOSS_QUERY).value);
    let target = parseFloat(document.querySelector(TAKE_PROFIT_QUERY).value);
    let posSizeInput = document.querySelector(POSITION_SIZE_QUERY);
    let balance = html.getBalanceFromHtml() * (100 / portfolioPercentage);

    // have to have balance, entry and stopLoss
    if (
      !helpers.isNumber(balance) ||
      !helpers.isNumber(entry) ||
      !helpers.isNumber(stopLoss)
    ) {
      return false;
    }

    let data = math.calculatePosSize(
      // dividing these with 100 because in settings we enter round numbers for percentages e.g. 1% max risk
      maxRisk / 100,
      tFee / 100,
      mFee / 100,
      balance,
      entry,
      stopLoss,
      target,
      entryOrderType,
      tpOrderType,
      slOrderType
    );

    let posSize = helpers.isStableCoin(unitOfMeasure)
      ? entry * data.maxPosSize
      : data.maxPosSize;

    if (isSetPosSize && helpers.isNumber(data.maxPosSize)) {
      html.setInputValue(posSizeInput, posSize);
    }

    if (isLogger) {
      html.logToWindow(data, posSize);
    }
  }

  function setTakeProfit(isLimit) {
	let entry = parseFloat(
		isLimit ? document.querySelector(INPUT_PRICE_QUERY).value
		: document.querySelector(LAST_PRICE_QUERY).innerText
	);
	let stopLoss = parseFloat(document.querySelector(STOP_LOSS_QUERY).value);
	let targetInput = document.querySelector(TAKE_PROFIT_QUERY);
	let targetPrice = math.calculateTargetPrice(_SETTINGS.RR_RATIO, stopLoss, entry);
	if(helpers.isNumber(targetPrice))
		html.setInputValue(targetInput, targetPrice);
  }
})();
