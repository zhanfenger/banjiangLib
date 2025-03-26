const toolsConfig = require('../../../../tools-config.js');

Page({
  data: {
    toolConfig: null, // 当前工具的配置
    inputs: {} // 用户输入的参数
  },

  onLoad(options) {
    // 根据工具 ID 获取配置
    const toolId = options.id;
    console.log('Tool ID:', toolId); // 调试信息

    const toolConfig = toolsConfig.pcb.concat(toolsConfig.common).find(tool => tool.id === toolId);
    console.log('Tool Config:', toolConfig); // 调试信息

    if (toolConfig) {
      this.setData({ toolConfig });
    } else {
      console.error('Tool config not found for ID:', toolId);
    }
  },

  onInputChange(e) {
    const { key } = e.currentTarget.dataset; // 获取输入项的 key
    const { value } = e.detail; // 获取用户输入的值
    this.setData({ [`inputs.${key}`]: value }); // 更新 inputs 对象
  },

  calculate() {
    const { toolConfig, inputs } = this.data;
    const calculator = require('../../../services/calculator.js');

    // 调用计算逻辑
    const result = calculator[toolConfig.category][toolConfig.id](inputs);
    this.setData({ result });
  }
});