/**
 * PDF报告生成服务
 */
const report = {
  /**
   * 生成PDF报告
   * @param {object} data - 报告数据
   * @param {function} callback - 回调函数
   */
  generatePDF(data, callback) {
    wx.cloud.callFunction({
      name: 'generatePDF',
      data: data,
      success(res) {
        callback(res.result);
      },
      fail(err) {
        console.error("生成PDF失败", err);
        callback(null);
      }
    });
  }
};

module.exports = report;