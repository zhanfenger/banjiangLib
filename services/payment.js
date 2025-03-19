/**
 * 支付服务封装
 */
const payment = {
  /**
   * 解锁详细步骤
   * @param {string} itemId - 解锁项ID
   * @param {function} callback - 回调函数
   */
  unlock(itemId, callback) {
    wx.requestPayment({
      timeStamp: String(Date.now()),
      nonceStr: '随机字符串',
      package: 'prepay_id=预支付订单ID',
      signType: 'MD5',
      paySign: '支付签名',
      success(res) {
        callback(true);
      },
      fail(err) {
        console.error("支付失败", err);
        callback(false);
      }
    });
  }
};

module.exports = payment;