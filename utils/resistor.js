/**
 * 电阻计算逻辑（分压/并联）
 */
module.exports = {
  /**
   * 计算分压电路
   * @param {object} inputs - 输入参数
   * @returns {object} - 计算结果
   */
  calculateDivider(inputs) {
    const { voltage, resistor1, resistor2 } = inputs;
    const outputVoltage = (voltage * resistor2) / (resistor1 + resistor2);
    const current = voltage / (resistor1 + resistor2);
    return {
      outputVoltage: outputVoltage.toFixed(2),
      current: current.toFixed(3)
    };
  },

  /**
   * 计算并联电阻
   * @param {object} inputs - 输入参数
   * @returns {object} - 计算结果
   */
  calculateParallel(inputs) {
    const { resistor1, resistor2 } = inputs;
    const totalResistance = (resistor1 * resistor2) / (resistor1 + resistor2);
    return {
      totalResistance: totalResistance.toFixed(2)
    };
  }
};