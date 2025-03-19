const toolsConfig = require('../../tools-config.json'); // 确保路径正确

Page({
  data: {
    pcbTools: [], // PCB工具列表
    commonTools: [] // 通用工具列表
  },

  onLoad() {
    // 从配置文件中加载工具数据
    this.setData({
      pcbTools: toolsConfig.pcb,
      commonTools: toolsConfig.common
    });
  }
});