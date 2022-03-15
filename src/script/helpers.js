const STABLECOINS = ["USDT", "USDC", "TUSD", "BUSD", "GUSD"];

const isNumber = (num) => typeof num === "number" && !isNaN(num);

const isStableCoin = (pair) => STABLECOINS.indexOf(pair) > -1;

export { isNumber, isStableCoin };
