// pages/shuju/shuju.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
  //选择excel文件
  chooseExcel(){
    let that = this;
    wx.chooseMessageFile({
      count:1,
      type:'file',
      success(r){
        let path = r.tempFiles[0].path;
        console.log("选择excel成功",path)
       // that.uploadExcel(path);
       //上传excel文件
        wx.cloud.uploadFile({
          cloudPath: r.tempFiles[0].name,
          filePath: path, //文件路径
          success:res =>{
            console.log("上传成功",res.fileID)
            //that.analyze(res.fileID)
            let fileId = res.fileID;
            // var number = wx.getStorageSync('user_number')
            //调用云函数解析文件
            wx.cloud.callFunction({
              name: 'excel',
              data: {
                fileID: fileId,
                //upload_p: number
              },
              success(res) {
                console.log("解析成功", res)
              },
              fail(err) {
                console.log("解析失败", err)
              },
            })
          },
          fail: err =>{
            console.log("上传失败", err)
          }
        })
      }
    })
  },


  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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