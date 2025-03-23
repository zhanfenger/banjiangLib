// pages/home/index.js
const toolsConfig = require('../../tools-config.js');

Page({
  data: {
    marqueeText: '欢迎使用板匠实验室！这里有丰富的工具供您使用。', // 滚动消息内容
    scrollLeft: 0, // 滚动消息的滚动位置
    categories: [
      { id: 'pcb', name: 'PCB工具' },
      { id: 'common', name: '通用工具' }
    ],
    activeCategory: 'pcb', // 当前选中的分类
    searchKeyword: '', // 搜索关键词
    tools: [], // 当前分类下的工具列表
    filteredTools: [] // 过滤后的工具列表
  },

  onLoad() {
    // 初始化工具列表
    this.setData({
      tools: toolsConfig.pcb,
      filteredTools: toolsConfig.pcb
    });

    // 启动滚动消息
    this.startMarquee();
  },

  // 启动滚动消息
  startMarquee() {
    const marqueeText = this.data.marqueeText;
    const textWidth = marqueeText.length * 14; // 假设每个字符宽度为14px
    const screenWidth = wx.getSystemInfoSync().windowWidth;

    let scrollLeft = 0;
    setInterval(() => {
      scrollLeft += 1;
      if (scrollLeft > textWidth) {
        scrollLeft = -screenWidth;
      }
      this.setData({ scrollLeft });
    }, 50); // 滚动速度，单位：毫秒
  },

  // 切换分类
  onCategoryTap(e) {
    const categoryId = e.currentTarget.dataset.id;
    const tools = categoryId === 'pcb' ? toolsConfig.pcb : toolsConfig.common;
    this.setData({
      activeCategory: categoryId,
      tools,
      filteredTools: tools
    });
  },

  // 搜索输入事件
  onSearchInput(e) {
    const keyword = e.detail.value.trim();
    const filteredTools = this.data.tools.filter(tool =>
      tool.name.includes(keyword)
    );
    this.setData({
      searchKeyword: keyword,
      filteredTools
    });
  },

  // 点击工具事件
  onToolTap(e) {
    const toolId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/tools/${this.data.activeCategory}/${toolId}/index`
    });
  }
});