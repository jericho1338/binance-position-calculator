// the logic behind the plugin
export const calculatePosSize = (
  maxRiskConst,
  takerFeeConst,
  makerFeeConst,
  balance,
  entry,
  stopLoss,
  target,
  entryOrderType,
  tpOrderType,
  slOrderType
) => {
  // basic stuff
  let isLong = entry > stopLoss;
  let maxToRiskAmount = balance * maxRiskConst * -1;

  // risk : reward
  let rewardPerUnit = isLong ? target - entry : entry - target;
  let riskPerUnit = isLong ? stopLoss - entry : entry - stopLoss;
  let riskReward = rewardPerUnit / -riskPerUnit;

  // max position - calculating stop loss fee in
  let totalCostPerUnit = isLong ? stopLoss - entry : entry - stopLoss;
  let maxPosSize = maxToRiskAmount / totalCostPerUnit;
  let maxPosSizeUSD = (maxToRiskAmount / totalCostPerUnit) * entry;

  // fees
  let entryFee = entry * calcFee(entryOrderType) * maxPosSize * -1;
  let stopLossFee = stopLoss * calcFee(slOrderType) * maxPosSize * -1;
  let takeProfitFee = target * calcFee(tpOrderType) * maxPosSize * -1;

  // totals after deducting fees
  let totalReward = isLong
    ? maxPosSize * target - maxPosSize * entry
    : maxPosSize * entry - maxPosSize * target;

  return {
    maxRiskConst,
    takerFeeConst,
    makerFeeConst,
    balance,
    entry,
    stopLoss,
    target,
    isLong,
    maxToRiskAmount,
    rewardPerUnit,
    riskPerUnit,
    riskReward,
    totalCostPerUnit,
    maxPosSize,
    maxPosSizeUSD,
    entryFee,
    stopLossFee,
    takeProfitFee,
    totalReward,
  };

  function calcFee(type) {
    return type === "market" ? makerFeeConst : takerFeeConst;
  }
};
