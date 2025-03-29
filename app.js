// app.js
App({
  globalData: {
    toolHistory: [],
    isAdmin: false,
    systemInfo: null
  },

  onLaunch() {
    this._initCloud()
      .then(() => this._loadEssentialData())
      .catch(err => {
        console.error('Init failed:', err)
        this.globalData.isAdmin = false
      })
  },

  // 云初始化（带环境校验）
  _initCloud() {
    return new Promise((resolve) => {
      try {
        wx.cloud.init({
          env: this._getEnvId(), // 动态获取环境ID
          traceUser: true
        })
        
        // 环境验证
        if (!wx.cloud.config.env) {
          throw new Error('Invalid cloud env')
        }

        console.log('Cloud initialized:', {
          env: wx.cloud.config.env,
          SDKVersion: this._getSystemInfo().SDKVersion
        })
        resolve()
      } catch (e) {
        console.warn('Cloud init fallback:', e)
        this._fallbackCloudInit()
        resolve()
      }
    })
  },

  // 获取动态环境ID
  _getEnvId() {
    // 正式环境ID（需替换）
    const prodEnv = 'prod-xxxxxx' 
    // 开发环境自动检测
    return process.env.NODE_ENV === 'development' ? 
      cloud.DYNAMIC_CURRENT_ENV : prodEnv
  },

  // 降级初始化方案
  _fallbackCloudInit() {
    wx.cloud.init({
      env: cloud.DYNAMIC_CURRENT_ENV,
      traceUser: false
    })
    this.globalData.isAdmin = false
  },

  // 加载必要数据
  _loadEssentialData() {
    return Promise.all([
      this._checkAdminStatus(),
      this._loadSystemInfo()
    ])
  },

  // 管理员检查（带容错）
  _checkAdminStatus() {
    return new Promise((resolve) => {
      if (process.env.NODE_ENV === 'development') {
        this.globalData.isAdmin = false
        return resolve()
      }

      wx.cloud.callFunction({
        name: 'checkAdmin',
        config: {
          env: this._getEnvId()
        },
        success: (res) => {
          this.globalData.isAdmin = res.result?.isAdmin || false
          resolve()
        },
        fail: (err) => {
          console.error('Admin check failed:', err)
          this.globalData.isAdmin = false
          resolve()
        }
      })
    })
  },

  // 获取系统信息（兼容新版API）
  _loadSystemInfo() {
    return new Promise((resolve) => {
      try {
        this.globalData.systemInfo = this._getSystemInfo()
        resolve()
      } catch (e) {
        console.warn('Get system info failed:', e)
        resolve()
      }
    })
  },

  // 系统信息获取方法
  _getSystemInfo() {
    try {
      return {
        ...wx.getWindowInfo(),
        ...wx.getDeviceInfo(),
        ...wx.getAppBaseInfo()
      }
    } catch (e) {
      console.warn('Fallback to deprecated API')
      return wx.getSystemInfoSync()
    }
  }
})