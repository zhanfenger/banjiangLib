// 云函数入口文件
const cloud = require('wx-server-sdk')
const crypto = require('crypto')

// 安全初始化
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  // 开发模式快速返回
  if (process.env.WX_CLOUD_ENV === 'development') {
    return { code: 200, isAdmin: false }
  }

  // 参数校验
  if (!event || typeof event !== 'object') {
    return { code: 400, isAdmin: false }
  }

  try {
    const { token } = event
    
    // 从环境变量获取密钥（安全）
    const ADMIN_KEY = process.env.ADMIN_KEY
    if (!ADMIN_KEY || !token) {
      return { code: 403, isAdmin: false }
    }

    // 安全计算
    const hash = crypto.createHash('sha256')
      .update(token + ADMIN_KEY)
      .digest('hex')

    // 从环境变量获取合法哈希值
    const validHash = process.env.ADMIN_HASH

    return {
      code: 200,
      isAdmin: hash === validHash,
      timestamp: Date.now()
    }
  } catch (err) {
    console.error('Admin check error:', err)
    return { code: 500, isAdmin: false }
  }
}