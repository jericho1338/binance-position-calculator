// html stuff -> ALL CRAP CODE
const _PREFIX = "binance-position-calculator";
const LOG_WINDOW_ID = `${_PREFIX}-container`;
const LOG_WINDOW_BTN_ID = `${_PREFIX}-details-btn`;
const LOG_WINDOW_DETAILED_ID = `${_PREFIX}-content-detailed`;
const LOG_WINDOW_MINI_ID = `${_PREFIX}-content-mini`;

const BALANCE_QUERY = "div[name=orderForm] span";

const DOWN_ICON = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"    viewBox="0 0 490.688 490.688" style="enable-background:new 0 0 490.688 490.688;" xml:space="preserve"> <g>   <path style="fill:#607D8B;" d="M472.328,216.529L245.213,443.665L18.098,216.529c-4.237-4.093-10.99-3.975-15.083,0.262     c-3.992,4.134-3.992,10.687,0,14.82l234.667,234.667c4.165,4.164,10.917,4.164,15.083,0l234.667-234.667     c4.093-4.237,3.975-10.99-0.262-15.083c-4.134-3.993-10.687-3.993-14.821,0L472.328,216.529z"/>   <path style="fill:#607D8B;" d="M472.328,24.529L245.213,251.665L18.098,24.529c-4.237-4.093-10.99-3.975-15.083,0.262     c-3.992,4.134-3.992,10.687,0,14.821l234.667,234.667c4.165,4.164,10.917,4.164,15.083,0L487.432,39.612     c4.237-4.093,4.354-10.845,0.262-15.083c-4.093-4.237-10.845-4.354-15.083-0.262c-0.089,0.086-0.176,0.173-0.262,0.262     L472.328,24.529z"/> </g> <path d="M245.213,469.415c-2.831,0.005-5.548-1.115-7.552-3.115L2.994,231.633c-4.093-4.237-3.975-10.99,0.262-15.083   c4.134-3.992,10.687-3.992,14.82,0l227.136,227.115l227.115-227.136c4.237-4.093,10.99-3.975,15.083,0.262   c3.993,4.134,3.993,10.687,0,14.821L252.744,466.279C250.748,468.28,248.04,469.408,245.213,469.415z"/> <path d="M245.213,277.415c-2.831,0.005-5.548-1.115-7.552-3.115L2.994,39.633c-4.093-4.237-3.975-10.99,0.262-15.083   c4.134-3.992,10.687-3.992,14.821,0l227.136,227.115L472.328,24.529c4.093-4.237,10.845-4.354,15.083-0.262   s4.354,10.845,0.262,15.083c-0.086,0.089-0.173,0.176-0.262,0.262L252.744,274.279C250.748,276.28,248.04,277.408,245.213,277.415z"/></svg>`;
const UP_ICON = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 490.544 490.544" style="enable-background:new 0 0 490.544 490.544;" xml:space="preserve"><g>	<path style="fill:#607D8B;" d="M18.098,274.151L245.213,47.015l227.115,227.136c4.237,4.093,10.99,3.975,15.083-0.262		c3.993-4.134,3.993-10.687,0-14.821L252.744,24.401c-4.165-4.164-10.917-4.164-15.083,0L2.994,259.068		c-4.093,4.237-3.975,10.99,0.262,15.083c4.134,3.992,10.687,3.992,14.82,0H18.098z"/>	<path style="fill:#607D8B;" d="M252.765,216.38c-4.165-4.164-10.917-4.164-15.083,0L3.016,451.047		c-4.093,4.237-3.976,10.99,0.262,15.083c4.134,3.993,10.687,3.993,14.821,0l227.115-227.115l227.115,227.136		c4.237,4.093,10.99,3.976,15.083-0.261c3.993-4.134,3.993-10.688,0-14.821L252.765,216.38z"/></g><path d="M479.88,277.266c-2.831,0.005-5.548-1.115-7.552-3.115L245.213,47.015L18.098,274.151	c-4.237,4.093-10.99,3.975-15.083-0.262c-3.992-4.134-3.992-10.687,0-14.82L237.682,24.401c4.165-4.164,10.917-4.164,15.083,0	l234.667,234.667c4.159,4.172,4.148,10.926-0.024,15.085C485.409,276.146,482.702,277.265,479.88,277.266z"/><path d="M479.88,469.266c-2.831,0.005-5.548-1.115-7.552-3.115L245.213,239.015L18.098,466.151	c-4.237,4.093-10.99,3.976-15.083-0.262c-3.993-4.134-3.993-10.687,0-14.821l234.667-234.667c4.165-4.164,10.917-4.164,15.083,0	l234.667,234.667c4.159,4.172,4.148,10.926-0.024,15.085C485.409,468.146,482.702,469.265,479.88,469.266z"/></svg>`;

// allows the log window to be draggable on the screen
const makeElementDraggable = (element) => {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  const header = element.querySelector("header");

  // if present, the header is where you move the div from
  if (header) {
    header.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the div from anywhere inside the div
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    e.target.style.cursor = "grabbing";
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = element.offsetTop - pos2 + "px";
    element.style.left = element.offsetLeft - pos1 + "px";
  }

  function closeDragElement(e) {
    e.target.style.cursor = "grab";
    document.onmouseup = null;
    document.onmousemove = null;
  }
};

const observeHtml = (containerQuery, elementQuery, onAdd, onRemove) => {
  let container = document.querySelector(containerQuery);

  if (container) {
    let observer = new MutationObserver(callback);
    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    return observer;
  }

  function callback(mutations = []) {
    let addedNodes = [].concat(
      ...mutations.map((m) => Array.from(m.addedNodes))
    );
    let removedNodes = [].concat(
      ...mutations.map((m) => Array.from(m.removedNodes))
    );

    let isAdded = addedNodes.reduce(findNode, false);
    let isRemoved = removedNodes.reduce(findNode, false);

    if (isAdded) onAdd();
    if (isRemoved) onRemove();

    function findNode(result, node) {
      return (
        result ||
        (node.querySelector && Boolean(node.querySelector(elementQuery)))
      );
    }
  }
};

// print out mini template
const getMiniReportTemplate = (
  maxPosition,
  totalReward,
  totalFees,
  riskReward
) => {
  return `
    <table style="border-collapse:collapse;">
      <tr>
        <td style="min-width:100px;">Max position:</td><td style="min-width:75px;">${maxPosition}</td>
      </tr>
      <tr>
        <td>Reward:</td><td>${totalReward}</td>
      </tr>
      <tr>
        <td>Fess:</td><td>${totalFees}</td>
      </tr>
      <tr>
        <td>R:R:</td><td>${riskReward}</td>
      </tr>
    </table>
  `;
};

// print out detailed template
const getDetailedReportTemplate = (
  bias,
  entry,
  stopLoss,
  target,
  rewardPerUnit,
  riskPerUnit,
  maxToRiskAmount,
  totalReward,
  riskReward,
  entryFee,
  stopLossFee,
  takeProfitFee
) => {
  return `
    <table style="border-collapse:collapse;">
      <tr>
        <td>Bias:</td><td>${bias}</td>
      </tr>
      <tr>
        <td>Entry:</td><td>${entry}</td>
      </tr>
      <tr>
        <td>Stop loss:</td><td>${stopLoss}</td>
      </tr>
      <tr>
        <td>Target:</td><td>${target}</td>
      </tr>
      <tr><td colspan="2">&nbsp;</td></tr>
      <tr>
        <td>Reward per unit:</td><td>${rewardPerUnit}</td>
      </tr>
      <tr>
        <td>Risk per unit:</td><td>${riskPerUnit}</td>
      </tr>
      <tr>
        <td>Max to risk:</td><td>${maxToRiskAmount}</td>
      </tr>
      <tr>
        <td>Total reward:</td><td>${totalReward}</td>
      </tr>
      <tr>
        <td>R:R:</td><td>${riskReward}</td>
      </tr>
      <tr><td colspan="2">&nbsp;</td></tr>
      <tr>
        <td>Entry fee:</td><td>${entryFee}</td>
      </tr>
      <tr>
        <td>Take profit fee:</td><td>${takeProfitFee}</td>
      </tr>
      <tr>
        <td>Stop loss fee:</td><td>${stopLossFee}</td>
      </tr>
      <tr>
        <td colspan="2">&nbsp;</td>
      </tr>
    </table>
`;
};

const stringToHtml = (htmlString) => {
  let template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  return template.content.firstChild;
};

const formatNum = (num, decimals, prefix = "", suffix = "") => {
  return !(typeof num === "number" && !isNaN(num))
    ? "n/a"
    : `${prefix}${decimals ? num.toFixed(decimals) : num}${suffix}`;
};

const appendNewStyleSheet = () => {
  // Create the <style> tag
  let style = document.createElement("style");
  // WebKit hack :(
  style.appendChild(document.createTextNode(""));
  // Add the <style> element to the page
  document.head.appendChild(style);
  return style.sheet;
};

const hidePnl = () => {
  const sheet = appendNewStyleSheet();
  sheet.insertRule(`.pnl { visibility: hidden }`, 0);
};

// horrible stuff oO
const createLogWindow = (title) => {
  let logWindow = document.getElementById(LOG_WINDOW_ID);
  if (logWindow === null) {
    const logWindowHtmlTemplate = getLogWindowTemplate(title);
    logWindow = stringToHtml(logWindowHtmlTemplate);
    logWindow.querySelector(`#${LOG_WINDOW_BTN_ID}`).onclick = function () {
      const detailedContent = document.getElementById(LOG_WINDOW_DETAILED_ID);
      detailedContent.hidden = !detailedContent.hidden;
      this.innerHTML = detailedContent.hidden ? DOWN_ICON : UP_ICON;
    };
    document.body.append(logWindow);
    makeElementDraggable(logWindow);
  }

  return logWindow;
};

const removeLogWindow = () => {
  document.getElementById(LOG_WINDOW_ID)?.remove();
};

const getLogWindowTemplate = (title = "") => {
  return `
    <div id="${LOG_WINDOW_ID}" style="background:yellow;opacity:0.95;color:#000;position:absolute;left:10px;top:10px;z-index:9999;font-size:14px;border:1px solid black;border-radius:4px;">
      <header style="cursor:grab; padding:10px; background: gold;border-top-left-radius:4px; border-top-right-radius:4px;">
        ${title}
        <span id="${LOG_WINDOW_BTN_ID}" style="float: right; width: 12px; cursor: pointer; padding: 0px 5px;">
          ${UP_ICON}
        </span>
      </header>
      <div style="padding: 10px;font-weight: 100;">
        <div id="${LOG_WINDOW_DETAILED_ID}"></div>
        <div id="${LOG_WINDOW_MINI_ID}" style="font-weight:400;"></div>
      </div>
    </div>
  `;
};

const logToWindow = (values, isStableCoin) => {
  let maxRisk = formatNum(values.maxRiskConst * 100, 2, undefined, "%");
  let bias = values.isLong ? "LONG" : "SHORT";
  let entry = formatNum(values.entry, 2, "$");
  let stopLoss = formatNum(values.stopLoss, 2, "$");
  let target = formatNum(values.target, 2, "$");
  let rewardPerUnit = formatNum(values.rewardPerUnit, 2, "$");
  let riskPerUnit = formatNum(values.riskPerUnit, 2, "$");
  let maxToRiskAmount = formatNum(values.maxToRiskAmount, 2, "$");
  let totalReward = formatNum(values.totalReward, 2, "$");
  let riskReward = formatNum(values.riskReward, 2);
  let entryFee = formatNum(values.entryFee, 5, "$");
  let stopLossFee = formatNum(values.stopLossFee, 5, "$");
  let takeProfitFee = formatNum(values.takeProfitFee, 5, "$");
  let totalFees = formatNum(values.entryFee + values.takeProfitFee, 2, "$");
  let maxPosSize = isStableCoin
    ? formatNum(values.maxPosSizeUSD, 2, "$")
    : formatNum(values.maxPosSize, 8);

  const detailedReport = stringToHtml(
    getDetailedReportTemplate(
      bias,
      entry,
      stopLoss,
      target,
      rewardPerUnit,
      riskPerUnit,
      maxToRiskAmount,
      totalReward,
      riskReward,
      entryFee,
      stopLossFee,
      takeProfitFee
    )
  );

  const miniReport = stringToHtml(
    getMiniReportTemplate(maxPosSize, totalReward, totalFees, riskReward)
  );

  const containerTitle = `Position Calculation - risk ${maxRisk}`;
  const container = createLogWindow(containerTitle);
  const details = container.querySelector(`#${LOG_WINDOW_DETAILED_ID}`);
  const miniDetails = container.querySelector("#" + LOG_WINDOW_MINI_ID);

  details.replaceChildren(detailedReport);
  miniDetails.replaceChildren(miniReport);
};

// change the input value and propagate the event (because entire page is made with React, this is mandatory)
const setInputValue = (input, value) => {
  input.value = value;
  input.dispatchEvent(new Event("change", { bubbles: true }));
};

const getBalanceFromHtml = () => {
  let balanceSpan = Array.from(document.querySelectorAll(BALANCE_QUERY)).find(
    (s) => /\d\s[USDT]/.test(s.innerText)
  );
  let balanceStr = balanceSpan.innerText.match(/[\d\.]+/);
  return balanceStr && balanceStr.length
    ? parseFloat(balanceSpan.innerText.match(/[\d\.]+/)[0])
    : 0;
};

// popup code from : https://html-online.com/articles/simple-popup-box/
// prettier-ignore
const initDialog = () => {
  const template = `
  <div class="hover_bkgr_fricc">
   <span class="helper"></span>
    <div>
      <div class="popupCloseButton">&times;</div>
      <b><p class="dialogText"></p></b>
    </div>
  </div>
  `;
  const dialog = stringToHtml(template);
  document.body.append(dialog);

  const dialogCss = appendNewStyleSheet();
  dialogCss.insertRule(`.hover_bkgr_fricc { background: #000; opacity:0.85; cursor: pointer; display: none; height: 100%; position: fixed; text-align: center; top: 0; width: 100%; z-index: 10000; }`, 0);
  dialogCss.insertRule(`.hover_bkgr_fricc .helper { display: inline-block; height: 100%; vertical-align: middle; }`, 0);
  dialogCss.insertRule(`.hover_bkgr_fricc > div { background-color: #fff; box-shadow: 10px 10px 60px #555; display: inline-block; height: auto; max-width: 551px; vertical-align: middle; width: 60%; position: relative; border-radius: 8px; padding: 15px 5%; }`, 0);
  dialogCss.insertRule(`.popupCloseButton { background-color: #fff; border: 3px solid #999; border-radius: 50px; cursor: pointer; display: inline-block; font-family: arial; font-weight: bold; position: absolute; top: -20px; right: -20px; font-size: 25px; line-height: 30px; width: 30px; height: 30px; text-align: center; }`, 0);
  dialogCss.insertRule(`.popupCloseButton:hover { background-color: #ccc; }`, 0);

  const background = document.querySelector(".hover_bkgr_fricc");
  const closeBtn = document.querySelector(".popupCloseButton");

  background.addEventListener("click", close);
  closeBtn.addEventListener("click", close);

  function close() {
    background.style.display = "none";
  }

  function open(text) {
    background.querySelector(".dialogText").innerHTML = text || "";
    background.style.display = "block";
  }

  return { close, open };
};

export {
  observeHtml,
  appendNewStyleSheet,
  hidePnl,
  removeLogWindow,
  logToWindow,
  setInputValue,
  getBalanceFromHtml,
  initDialog,
};
