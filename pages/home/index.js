const toolsConfig = require('../../tools-config.js'); // 加载 JS 文件

Page({
  data: {
    pcbTools: [], // PCB工具列表
    commonTools: [] // 通用工具列表
  },

  onLoad() {
    // 添加调试信息，检查文件是否加载成功
    try {
      console.log('toolsConfig loaded successfully:', toolsConfig);
      
      // 从配置文件中加载工具数据
      this.setData({
        pcbTools: toolsConfig.pcb,
        commonTools: toolsConfig.common
      });
    } catch (error) {
      console.error('Failed to load tools-config.js:', error);
    }
  }
});