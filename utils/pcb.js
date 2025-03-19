module.exports = {
  calculateViaCurrent(inputs) {
    const { copperWeight, holeSize } = inputs;
    const maxCurrent = (copperWeight + 1) * holeSize * 0.5;
    return {
      maxCurrent: maxCurrent.toFixed(2),
      warning: maxCurrent > 3 ? '温升可能过高，请检查散热' : null
    };
  },

  calculateTraceCurrent(inputs) {
    const { traceWidth, copperWeight, tempRise } = inputs;
    const maxCurrent = traceWidth * (copperWeight + 1) * tempRise * 0.1;
    const powerLoss = maxCurrent * maxCurrent * 0.05;
    return {
      maxCurrent: maxCurrent.toFixed(2),
      powerLoss: powerLoss.toFixed(2)
    };
  },

  calculateImpedance(inputs) {
    const { traceWidth, dielectricThickness, dielectricConstant } = inputs;
    const impedance = (87 / Math.sqrt(dielectricConstant + 1.41)) * Math.log((5.98 * dielectricThickness) / (0.8 * traceWidth + 0.1));
    return {
      impedance: impedance.toFixed(2)
    };
  }
};