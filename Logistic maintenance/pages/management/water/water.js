// pages/water/water.js
const db = wx.cloud.database({});
const work = db.collection('worker');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    work: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    db.collection('worker').get({
      success(r) {
        var arr = [];
        for (var i = 0; i < r.data.length; i++) {
          //console.log(r.data[i].id)
          if (r.data[i].type === '水管工') {
            //console.log(r.data[i])
            arr.push(r.data[i])  //循环数据进数组
          }
        }
        //console.log(arr)
        that.setData({
          work: arr
        })
        //console.log(arr[0])
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})