const pcbUtils = require('../utils/pcb.js');
const resistorUtils = require('../utils/resistor.js');
const unitUtils = require('../utils/unit-convert.js');

module.exports = {
  pcb: {
    viaCurrent: (inputs) => pcbUtils.calculateViaCurrent(inputs),
    traceCurrent: (inputs) => pcbUtils.calculateTraceCurrent(inputs),
    impedance: (inputs) => pcbUtils.calculateImpedance(inputs)
  },
  resistor: {
    divider: (inputs) => resistorUtils.calculateDivider(inputs)
  },
  unit: {
    convert: (inputs) => unitUtils.convert(inputs)
  }
};