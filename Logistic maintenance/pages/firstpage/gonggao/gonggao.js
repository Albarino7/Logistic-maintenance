// pages/about/about.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
const db = wx.cloud.database({});
const m_message = db.collection('M_message');
var util = require('../../../utils/util.js')
//var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    m_message:[],
    m_label:'',
    message:'',
    c_time:''

  },
  onLoad: function (options){
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
    //将数据库中数据放到数组里
    var this_1 = this;
    db.collection('M_message').orderBy('time', 'asc').get({
      success(r) {
        //console.log(r.data)
        //console.log(this);
        //console.log(r.data[0]);
        this_1.setData({
          m_message: r.data
        })
      }
    })
    //console.log()
    
  }, 
  
  onInput_1(e){
    this.setData({
      m_label: e.detail
    });
  },
  onInput_2(e){
    var data_time = util.formatTime1(new Date(), "yyyy-MM-dd HH:mm")
    this.setData({
      message: e.detail,
      c_time: data_time
    });
  },
 //点击提交公告传数据到数据库
  submit: function (e){
    var m_lable = this.data.m_label;
    var message = this.data.message;
    var time = this.data.c_time;
    var u_number = this.data.u_number
    if (m_lable === ''){
      Toast.fail('请填写标题')
    } else if (message === ''){
      Toast.fail('请填写内容')
    }else{
      db.collection('M_message').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          lable: m_lable,
          message: message,
          time: time,
          u_number: u_number
        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          //console.log(res.data);
          //console.log(res.errMsg);
          Toast.success('提交公告成功');
        }
      })

      this.onPullDownRefresh()

    }
   
  },
  //宿管删除公告
  delete_m:function(e){
    //var user_id = wx.getStorageSync('user_id') //  获取登陆id
    var number = wx.getStorageSync('user_number')
    let u_number = e.currentTarget.dataset.num;
     if( number == u_number ){
       let id = e.currentTarget.id;
       const db = wx.cloud.database();
       db.collection("M_message").doc(id).remove({
         success: res => {
           Toast.success('删除成功');
           this.onLoad()//删除成功重新加载
         }, fail: err => {
           Toast.fail('删除失败')
         }
       })
     } else {
       Toast.fail('您无权删除');
     } 
    this.onPullDownRefresh()

  },

  //监听页面刷新
  onPullDownRefresh: function () {
    this.setData({
      m_label: '',
      message: '',
    })
    this.onLoad();
  },
})