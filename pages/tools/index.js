// pages/tools/index.js
Page({
  data: {
    tools: [
      {
        name: 'PCB工具',
        children: [
          { name: '过孔电流', path: '/pages/tools/pcb/via-current/index' },
          { name: '走线电流', path: '/pages/tools/pcb/trace-current/index' },
          { name: '阻抗计算', path: '/pages/tools/pcb/impedance/index' }
        ]
      },
      {
        name: '通用工具',
        children: [
          { name: '电阻分压', path: '/pages/tools/common/resistor-divider/index' },
          { name: '单位换算', path: '/pages/tools/common/unit-convert/index' },
          { name: '协议速查', path: '/pages/tools/common/protocol-reference/index' }
        ]
      }
    ]
  },
  navigateTo(e) {
    wx.navigateTo({ url: e.currentTarget.dataset.path })
  }
})