const calculator = require('../../../services/calculator.js');

Page({
  data: {
    voltage: null,
    resistor1: null,
    resistor2: null,
    result: null
  },

  setVoltage(e) {
    this.setData({ voltage: parseFloat(e.detail.value) });
  },

  setResistor1(e) {
    this.setData({ resistor1: parseFloat(e.detail.value) });
  },

  setResistor2(e) {
    this.setData({ resistor2: parseFloat(e.detail.value) });
  },

  calculate() {
    const { voltage, resistor1, resistor2 } = this.data;
    if (!voltage || !resistor1 || !resistor2) {
      wx.showToast({ title: '请输入完整参数', icon: 'none' });
      return;
    }
    const result = calculator.resistor.divider({ voltage, resistor1, resistor2 });
    this.setData({ result });
  }
});