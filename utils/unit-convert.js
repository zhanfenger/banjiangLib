/**
 * 单位换算核心逻辑
 */
const conversionFactors = {
  mm: { mil: 39.3701 },
  mil: { mm: 0.0254 },
  Ω: { kΩ: 0.001 },
  kΩ: { Ω: 1000 },
  V: { mV: 1000 },
  mV: { V: 0.001 }
};

module.exports = {
  /**
   * 单位换算
   * @param {object} inputs - 输入参数
   * @returns {string} - 换算结果
   */
  convert(inputs) {
    const { value, sourceUnit, targetUnit } = inputs;
    if (sourceUnit === targetUnit) return value;
    return (value * conversionFactors[sourceUnit][targetUnit]).toFixed(4);
  }
};