/**
 * IPC-2221 电源线电流标准
 */
module.exports = {
  /**
   * 计算电源线电流
   * @param {object} inputs - 输入参数
   * @returns {object} - 计算结果
   */
  calculateTraceCurrent(inputs) {
    const { traceWidth, copperWeight, tempRise } = inputs;
    const maxCurrent = traceWidth * (copperWeight + 1) * tempRise * 0.1;
    const powerLoss = maxCurrent * maxCurrent * 0.05;
    return {
      maxCurrent: maxCurrent.toFixed(2),
      powerLoss: powerLoss.toFixed(2)
    };
  }
};