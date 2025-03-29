Page({
  onLoad() {
    wx.showLoading({
      title: '加载工具...',
      mask: true
    })

    // 模拟跳转延迟（实际项目可删除）
    setTimeout(() => {
      wx.hideLoading()
      wx.redirectTo({
        url: '/pages/tools/pcb/via-current/index'  // 默认跳转第一个工具
      })
    }, 300)
  },

  // 兼容直接分享进入的情况
  onShareAppMessage() {
    return {
      title: '板匠实验室工具集',
      path: '/pages/tools/entry/index'
    }
  }
})