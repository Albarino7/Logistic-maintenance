//index.js
//获取应用实例
var app = getApp()
var md = require('../../utils/md5.js')
var dt = require('../../utils/data.js')
var utils = require('../../utils/util.js')
import Toast from '@vant/weapp/toast/toast';
Page({
  data: {
    savedFilePath: "",
    //username: getApp().globalData.username,
    password: "",
    code: "",
    // 滚动图
    imgUrls: [
      '../../images/circle/heu1.png',
      '../../images/circle/heu2.png',
      '../../images/circle/heu3.png',
      '../../images/circle/heu4.png',
    ],
    // 工具第一行
    arr1: [
      { imgurl: '../../images/toolbar/green.png', txt: '绿化公示' },
      { imgurl: '../../images/toolbar/upload.png', txt: '数据上传' },
      { imgurl: '../../images/toolbar/leave_m.png', txt: '学生留言' },
      { imgurl: '../../images/toolbar/scan.png', txt: '扫一扫' }
    ],
    // 工具第二行
    arr2: [
      { imgurl: '../../images/toolbar/fix.png', txt: '宿舍报修' },
      { imgurl: '../../images/toolbar/check.png', txt: '维修审核' },
      { imgurl: '../../images/toolbar/progress.png', txt: '维修进度' },
      { imgurl: '../../images/toolbar/announcement.png', txt: '宿管公示' }
    ]
  },
  onLoad:function(options){
 

  },

  //点击跳转相应的页面  跳转到非tabBar页面用navigateTo  tarBar用switchTab
  kindToggle: function (e) {
    var txt = e.currentTarget.id;
    var id = wx.getStorageSync('user_id')
    console.log(id)
    //var code = this.data.code;
    //var httpsurl = app.globalData.url;
    //var url1 = '../detail/detail?ch=' + code.slice(2);
    switch (txt) {
      case '绿化公示':
        if (id == "W_manager"){
          wx.navigateTo({
            url: '../lvhua/lvhua'
          });
        }else{
          Toast.fail('您无权上传')
        }
        
        break;
      case '数据上传':
        if (id == "W_manager"){
          wx.navigateTo({
            url: '../shuju/shuju'
          })
        }else{
          Toast.fail('您无权上传')
        }
        
        break;
      case '学生留言':
        if (id == "student" || id == "S_manager"){
        wx.navigateTo({
          url: '../studentM/studentM'
        })
      }else{
        Toast.fail('您无权查看')
      }   
        break;
      case '扫一扫':
        wx.scanCode({
          success: (res) => {
            console.log(res.result)
            // var url = '../stationmessage/stationmessage?id=' + res.result
            // wx.navigateTo({
            //   url: url
            // });
          }
        });
        break;
      case '宿舍报修':
        if (id == "student") {
          wx.navigateTo({
            url: '../susheWx/susheWx'
          });
        } else {
          Toast.fail('您不是学生')
        }
        
        break;
      case '维修审核':
        if (id == "W_manager") {
          wx.switchTab({
            url: '../Houqinweixiu/HouqinWX',
          })
        } else {
          Toast.fail('您无权审核')
        }
        break;
      case '维修进度':
          wx.navigateTo({
              url: '../jindu/jindu'
          });
          break;
      case '宿管公示':
        if (id == "student" || id == "S_manager") {
          wx.navigateTo({
            url: '../gonggao/gonggao'
          });
        } else {
          Toast.fail('您无权查看')
        }
          
          break;
    }
  }
})