// pages/my_history/my_history.js
//import Toast from '../../dist/toast/toast';

const db = wx.cloud.database({});
//const repair1 = db.collection('Repair_order');
//const repair2 = db.collection('Repair_order');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    repair1:[],
    repair2:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'user_id',    //缓存数据时的关键字，保持一致
      success: function (r) {
        console.log(r.data);  //成功后回调的函数
        that.setData({
          u_id: r.data
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
        console.log('读取user_name发生错误')
      }
    })
    db.collection('Repair_order').get({
      success(r) {
        //console.log(r.data)
        //console.log(this);
        var arr1 = [];
        var arr2 = [];
        for (let i = 0; i < r.data.length; i++) {
          if (r.data[i].action == 2 || r.data[i].action == 3){
            if (r.data[i].worker === that.data.u_name) {
              arr1.push(r.data[i])
            }
            if (r.data[i].realName === that.data.u_name) {
              arr2.push(r.data[i])
            }
          }
          
        }
        that.setData({ 
          repair1: arr1,
          repair2: arr2
          })
        //console.log(arr1[0])
        //console.log(arr2[0])
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