// pages/home/index.js
const toolsConfig = require('../../tools-config.js');

Page({
  data: {
    marqueeText: '欢迎使用板匠实验室！这里有丰富的工具供您使用，你的满意是我们最大的荣耀。',
    scrollPos: 0,
    contentWidth: 0,
    scrollSpeed: 50,
    marqueeTimer: null,
    categories: [
      { id: 'pcb', name: 'PCB工具' },
      { id: 'common', name: '通用工具' }
    ],
    activeCategory: 'pcb',
    searchKeyword: '',
    allTools: [...toolsConfig.pcb, ...toolsConfig.common],
    filteredTools: [...toolsConfig.pcb, ...toolsConfig.common],
    isSearching: false
  },

  onLoad() {
    this.initMarquee();
    this.setData({
      filteredTools: this.data.allTools
    });
  },

  onShow() {
    if (this.data.searchKeyword) {
      this.doSearch(this.data.searchKeyword);
    }
    this.startMarquee();
  },

  onHide() {
    this.stopMarquee();
  },

  onUnload() {
    this.stopMarquee();
    // 保存使用记录
    wx.setStorage({
      key: 'toolHistory',
      data: getApp().globalData.toolHistory
    });
  },

  initMarquee() {
    const query = wx.createSelectorQuery().in(this);
    query.select('.marquee-content').boundingClientRect(rect => {
      if (rect) {
        this.setData({
          contentWidth: rect.width,
          scrollPos: 0
        }, () => {
          this.startMarquee();
        });
      }
    }).exec();
  },

  startMarquee() {
    this.stopMarquee();
    const speed = this.data.scrollSpeed;
    const duration = 16;
    
    this.data.marqueeTimer = setInterval(() => {
      this.setData({
        scrollPos: this.data.scrollPos - (speed * duration / 1000)
      });
      
      if (this.data.scrollPos <= -this.data.contentWidth) {
        this.setData({ scrollPos: 0 });
      }
    }, duration);
  },

  stopMarquee() {
    if (this.data.marqueeTimer) {
      clearInterval(this.data.marqueeTimer);
      this.data.marqueeTimer = null;
    }
  },

  onCategoryTap(e) {
    const categoryId = e.currentTarget.dataset.id;
    this.setData({
      activeCategory: categoryId
    });
    
    if (!this.data.isSearching) {
      const tools = categoryId === 'pcb' ? toolsConfig.pcb : toolsConfig.common;
      this.setData({
        filteredTools: tools
      });
    }
  },

  onSearchInput(e) {
    const keyword = e.detail.value.trim();
    this.setData({
      searchKeyword: keyword,
      isSearching: keyword.length > 0
    });
    this.doSearch(keyword);
  },

  doSearch(keyword) {
    if (!keyword) {
      const tools = this.data.activeCategory === 'pcb' ? toolsConfig.pcb : toolsConfig.common;
      this.setData({
        filteredTools: tools,
        isSearching: false
      });
      return;
    }

    const lowerKeyword = keyword.toLowerCase();
    const filteredTools = this.data.allTools.filter(tool => {
      if (tool.name.toLowerCase().includes(lowerKeyword)) {
        return true;
      }
      
      const pinyinName = this.getPinyin(tool.name).toLowerCase();
      const pinyinParts = pinyinName.split(' ');
      return pinyinParts.some(part => part.startsWith(lowerKeyword));
    });

    this.setData({ filteredTools });
  },

  getPinyin(text) {
    const pinyinMap = {
      'P': 'p', 'C': 'c', 'B': 'b',
      '过': 'guo', '孔': 'kong', '电': 'dian', '流': 'liu',
      '走': 'zou', '线': 'xian', '阻': 'zu', '抗': 'kang',
      '计': 'ji', '算': 'suan', '源': 'yuan', '分': 'fen',
      '压': 'ya', '工': 'gong', '程': 'cheng', '单': 'dan',
      '位': 'wei', '换': 'huan', '协': 'xie', '议': 'yi',
      '速': 'su', '查': 'cha', '表': 'biao'
    };

    return text.split('').map(char => {
      return pinyinMap[char] ? pinyinMap[char] + ' ' : char;
    }).join('').trim();
  },

  onToolTap(e) {
    const url = `/pages/tools/${this.data.activeCategory}/${e.currentTarget.dataset.id}/index`;
    const app = getApp();
    app.globalData.toolHistory = [...(app.globalData.toolHistory || []).slice(-9), url];
    wx.navigateTo({ url });
  },
  
  onPageTap() {
    if (this.data.searchKeyword) {
      this.setData({
        isSearching: true
      });
    }
  },

  // 悬浮工具按钮点击事件
  onToolMenuTap() {
    const app = getApp();
    const history = app.globalData.toolHistory || [];
    
    // 常用工具排序
    const frequentTools = [
      { name: '单位换算', path: '/pages/tools/common/unit-convert/index' },
      { name: '协议速查', path: '/pages/tools/common/protocol-reference/index' },
      { name: '电阻分压', path: '/pages/tools/common/resistor-divider/index' }
    ].sort((a, b) => {
      const countA = history.filter(h => h === a.path).length;
      const countB = history.filter(h => h === b.path).length;
      return countB - countA;
    });

    // 管理员功能检测
    const itemList = [
      ...frequentTools.map(t => t.name),
      '工程计算器',
      '设计规范(IPC)'
    ];
    if (app.globalData.isAdmin) {
      itemList.push('管理后台');
    }

    wx.showActionSheet({
      itemList,
      success: (res) => {
        let url;
        if (res.tapIndex < frequentTools.length) {
          url = frequentTools[res.tapIndex].path;
        } else {
          switch(res.tapIndex - frequentTools.length) {
            case 0: url = '/pages/calculator/index'; break;
            case 1: url = '/pages/standards/ipc'; break;
            case 2: url = '/pages/admin/index'; break;
          }
        }
        
        // 记录使用历史
        app.globalData.toolHistory = [...(history.slice(-9)), url];
        wx.navigateTo({ url });
      },
      fail: () => wx.vibrateShort({ type: 'light' }) // 取消时震动反馈
    });
  }
});