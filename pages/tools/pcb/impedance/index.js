const calculator = require('../../../../services/calculator.js');

Page({
  data: {
    traceWidth: null,
    dielectricThickness: null,
    dielectricConstant: null,
    result: null
  },

  setTraceWidth(e) {
    this.setData({ traceWidth: parseFloat(e.detail.value) });
  },

  setDielectricThickness(e) {
    this.setData({ dielectricThickness: parseFloat(e.detail.value) });
  },

  setDielectricConstant(e) {
    this.setData({ dielectricConstant: parseFloat(e.detail.value) });
  },

  calculate() {
    const { traceWidth, dielectricThickness, dielectricConstant } = this.data;
    if (!traceWidth || !dielectricThickness || !dielectricConstant) {
      wx.showToast({ title: '请输入完整参数', icon: 'none' });
      return;
    }
    const result = calculator.pcb.impedance({ traceWidth, dielectricThickness, dielectricConstant });
    this.setData({ result });
  }
});