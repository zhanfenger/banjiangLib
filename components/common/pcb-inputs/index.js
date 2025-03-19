Component({
  properties: {
    copperWeight: {
      type: Number,
      value: 0
    },
    traceWidth: {
      type: Number,
      value: null
    }
  },

  data: {
    copperOptions: ['1 oz', '2 oz']
  },

  methods: {
    onCopperWeightChange(e) {
      this.setData({ copperWeight: e.detail.value });
      this.triggerEvent('copperweightchange', { value: e.detail.value });
    },

    onTraceWidthInput(e) {
      this.setData({ traceWidth: parseFloat(e.detail.value) });
      this.triggerEvent('tracewidthinput', { value: parseFloat(e.detail.value) });
    }
  }
});