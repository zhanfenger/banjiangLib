const calculator = require('../../../services/calculator.js');

Page({
  data: {
    traceWidth: null,
    copperWeight: 0,
    copperOptions: ['1 oz', '2 oz'],
    tempRise: null,
    result: null
  },

  setTraceWidth(e) {
    this.setData({ traceWidth: parseFloat(e.detail.value) });
  },

  setCopperWeight(e) {
    this.setData({ copperWeight: e.detail.value });
  },

  setTempRise(e) {
    this.setData({ tempRise: parseFloat(e.detail.value) });
  },

  calculate() {
    const { traceWidth, copperWeight, tempRise } = this.data;
    if (!traceWidth || !tempRise) {
      wx.showToast({ title: '请输入完整参数', icon: 'none' });
      return;
    }
    const result = calculator.pcb.traceCurrent({ traceWidth, copperWeight, tempRise });
    this.setData({ result });
  }
});