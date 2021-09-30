// pages/my_wx/my_wx.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';

const db = wx.cloud.database({});
//const repair = db.collection('Repair_order');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    repair:[]
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
        //console.log(that.data.u_number)
      },
      fail: function () {      //失败后回调的函数
        console.log('读取user_id发生错误')
      }
    })  
    wx.getStorage({
      key: 'user_name',    //缓存数据时的关键字，保持一致
      success: function (r) {
        console.log(r.data);  //成功后回调的函数
        that.setData({
          u_name: r.data
        })
        //console.log(that.data.u_name)
      },
      fail: function () {      //失败后回调的函数
        console.log('读取user_id发生错误')
      }
    }) 
    db.collection('Repair_order').get({
      success(r) {
        //console.log(r.data)
        //console.log(this);
        var arr = []; //记住位置别乱放
        for (let i = 0; i < r.data.length; i++){
          var action = r.data[i].action
          if (action == 1){
            if (r.data[i].worker === that.data.u_name) {
             // console.log(r.data[i])
              arr.push(r.data[i])
              //console.log(arr)
            }
          }
        }
        that.setData({ repair: arr })
      }
      
    })
  },
  onPass_1(e){
    let id = e.currentTarget.id;
    const db = wx.cloud.database();
    var arr = this.data.repair;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]._id == id) {
        //console.log(arr[i])
        db.collection('Repair_order').doc(id).update({
          data: {
            action: '2',
          },
          success: function (res) {    // res 是一个对象
            console.log(res)
          },
          fail: console.error,
        })
      }
    }
    Toast.success('已完成维修')
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
    this.onLoad()
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