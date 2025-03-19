/**
 * IPC-2152 过孔电流标准
 */
module.exports = {
  /**
   * 计算过孔电流
   * @param {object} inputs - 输入参数
   * @returns {object} - 计算结果
   */
  calculateViaCurrent(inputs) {
    const { copperWeight, holeSize } = inputs;
    const maxCurrent = (copperWeight + 1) * holeSize * 0.5;
    return {
      maxCurrent: maxCurrent.toFixed(2),
      warning: maxCurrent > 3 ? '温升可能过高，请检查散热' : null
    };
  }
};