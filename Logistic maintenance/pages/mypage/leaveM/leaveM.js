// pages/leaveM/leaveM.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
const db = wx.cloud.database({});
const s_message = db.collection('S_message');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    s_message: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'user_number',    //缓存数据时的关键字，保持一致
      success: function (r) {
        console.log(r.data);  //成功后回调的函数
        that.setData({
          u_number: r.data
        })

        //console.log(that.data.user_number)
      },
      fail: function () {      //失败后回调的函数
        console.log('读取user_number发生错误')
      }
    })
    db.collection('S_message').orderBy('time', 'desc').get({
      success(r) {
        var arr = [];
        //console.log(r.data)
        //console.log(this);
        for (let i = 0; i < r.data.length; i++) {
          //console.log(that.data.u_number)
          if (r.data[i].number == that.data.u_number) {
            arr.push(r.data[i])
          }
        }
        //console.log(arr)
        that.setData({
          s_message: arr
        })
        console.log(arr[0])
      }
    })

  },
  //学生删除留言
  delete_m: function (e) {

    //console.log(e.currentTarget.id)
    let id = e.currentTarget.id;
    const db = wx.cloud.database();
    db.collection("S_message").doc(id).remove({
      success: res => {
        Toast.success('删除成功');
      }, fail: err => {
        Toast.fail('删除失败')
      }
    })
    this.onPullDownRefresh()

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
    this.onLoad();
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