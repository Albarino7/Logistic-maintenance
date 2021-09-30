//login.js

const db = wx.cloud.database();
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
        remind: '加载中',
        help_status: false,
        userid_focus: false,
        passwd_focus: false,
        number: '',
        idCard: '',
        angle: 0,
        dlzc:[]
  },
  //选中框用蓝色标签围起来
  inputFocus: function (e) {
    if (e.target.id == 'number') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'idCard') {
      this.setData({
        'passwd_focus': true
      });
    }
  },
  
  inputBlur: function (e) {
    if (e.target.id == 'number') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'idCard') {
      this.setData({
        'passwd_focus': false
      });
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var arr = [];
    db.collection('student').get({
      success(r){
       // console.log(r)
        for (let i = 0; i < r.data.length; i++) {
          arr.push(r.data[i])
        }
      }
    })
    db.collection('teacher').get({
      success(r) {
        for (let i = 0; i < r.data.length; i++) {
          arr.push(r.data[i])
        }
        //console.log(arr)
      }
    })
    db.collection('worker').get({
      success(r) {
        for (let i = 0; i < r.data.length; i++) {
          arr.push(r.data[i])
        }
        //console.log(arr)
      }
    })
    db.collection('s_manager').get({
      success(r) {
        for (let i = 0; i < r.data.length; i++) {
          arr.push(r.data[i])
        }
        //console.log(arr)
      }
    })
    db.collection('w_manager').get({
      success(r) {
        for (let i = 0; i < r.data.length; i++) {
          arr.push(r.data[i])
        }
       // console.log(r.data)
      }
    })
    that.setData({
      dlzc:arr
    })   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);

    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },

   // 获取输入账号 
   stunumInput(event){
    this.setData({
      number: event.detail.value
    })
  },
  
  // 获取输入密码  
  passwordInput(event) {
    this.setData({
      idCard: event.detail.value
    })
  },

  tapHelp: function (e) {
      if (e.target.id == 'help') {
          this.hideHelp();
      }
  },
  showHelp: function (e) {
      this.setData({
          'help_status': true
      });
  },
  hideHelp: function (e) {
      this.setData({
          'help_status': false
      });
  },
  // 登录  
  login() {
    let number = this.data.number
    let idCard = this.data.idCard
    console.log('账号', number, '密码', idCard)
    let dlzc = this.data.dlzc
    //console.log(dlzc)
    if (number.length != 9 && number.length != 12) {
      Toast.fail('账号输入错误');
      return
    }
    for(let i =0; i<dlzc.length; i++){
      if(number ===dlzc[i].number && idCard === dlzc[i].password){
        Toast.success('登陆成功');
        console.log('登陆成功！');
        let id = dlzc[i].id;//获取账号身份
        let phone_n = dlzc[i].phone_n;
        let name = dlzc[i].name;
        let number = dlzc[i].number;
        wx.switchTab({   //跳转首页
          url: '../index/index',
        })
        wx.setStorage({    //数据缓存方法
          key: 'user_id',   //关键字，本地缓存中指定的key
          data: id,    //缓存微信用户公开信息，
          success: function () {      //缓存成功后，输出提示
            console.log('写入id缓存成功')
          },
          fail: function () {        //缓存失败后的提示
            console.log('写入id发生错误')
          }
        })
        wx.setStorage({    //数据缓存方法
          key: 'user_number',   //关键字，本地缓存中指定的key
          data: number,    //缓存微信用户公开信息，
          success: function () {      //缓存成功后，输出提示
            console.log('写入number缓存成功')
          },
          fail: function () {        //缓存失败后的提示
            console.log('写入number发生错误')
          }
        })

         wx.setStorage({    //数据缓存方法
          key: 'user_name',   //关键字，本地缓存中指定的key
          data: name,    //缓存微信用户公开信息，
          success: function () {      //缓存成功后，输出提示
            console.log('写入name缓存成功')
          },
          fail: function () {        //缓存失败后的提示
            console.log('写入name发生错误')
          }
        })

        wx.setStorage({    //数据缓存方法
          key: 'user_phone',   //关键字，本地缓存中指定的key
          data: phone_n,    //缓存微信用户公开信息，
          success: function () {      //缓存成功后，输出提示
            console.log('写入phone缓存成功')
          },
          fail: function () {        //缓存失败后的提示
            console.log('写入phone发生错误')
          }
        })

    }else{  //不存在
      Toast.fail('用户名/密码错误');
      }
  }
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