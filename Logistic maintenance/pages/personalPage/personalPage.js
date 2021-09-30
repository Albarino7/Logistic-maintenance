Page({

  /**
   * 页面的初始数据
   */
  data: {
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
          number:r.data
        })
        
        //console.log(that.data.user_number)
      },
      fail: function () {      //失败后回调的函数
        console.log('读取user_number发生错误')
      }
   })
    wx.getStorage({
      key: 'user_id',    //缓存数据时的关键字，保持一致
      success: function (r) {
        console.log(r.data);  //成功后回调的函数
        that.setData({
          u_id: r.data
        })

        //console.log(that.data.u_id)
      },
      fail: function () {      //失败后回调的函数
        console.log('读取user_id发生错误')
      }
    }) 
  },
  //页面单击跳转
  tap1: function () {
    wx.navigateTo({ url: '../my_history/my_history'  })
  },
  tap3: function () {
    wx.navigateTo({  url: '../leaveM/leaveM'  })
  },
  tap4: function () {
    wx.navigateTo({  url: '../my_gg/mygg'  })
  },
  tap5: function () {
    wx.navigateTo({  url: '../kefu/kefu'  })
  },
  tap6: function () {
    wx.navigateTo({ url: '../my_wx/my_wx'  })
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
    
  },
  

})