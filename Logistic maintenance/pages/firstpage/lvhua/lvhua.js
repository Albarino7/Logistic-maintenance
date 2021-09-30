import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    file_ID: [],
    name: [],
  },

  upload_File() {
    let that = this;
    //选择文件
    wx.chooseMessageFile({
      count:3,
      type:'file',
      success(r){
        let path = r.tempFiles[0].path;
      //  let name = r.tempFiles[0].name;
        console.log("选择文件成功",path)
       // that.uploadExcel(path);
       //上传文件
        wx.cloud.uploadFile({
          cloudPath: r.tempFiles[0].name,
          filePath: path, //文件路径
          success:res =>{
            console.log("上传成功",res.fileID)
            //that.analyze(res.fileID)
      //    let fileId = res.fileID;           
            Toast.success('上传成功')

          }
        })
      }
    })
   
  },
  
/*  download_File() {
    console.log(this.data.file_ID)
    wx.cloud.downloadFile({
      fileID: 'a7xzcb',
      success: res => {
        // get temp file path
        console.log(res.tempFilePath)
      },
      fail: err => {
        // handle error
      }
    })
  },*/
  

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

        //console.log(that.data.u_id)
      },
      fail: function () {      //失败后回调的函数
        console.log('读取user_id发生错误')
      }
    })
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
