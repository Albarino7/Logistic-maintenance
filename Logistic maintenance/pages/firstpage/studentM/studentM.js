// pages/bxDetail/bxDetail.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
const db = wx.cloud.database({});
const s_message = db.collection('S_message');
var util = require('../../../utils/util.js')

Page({
    data: {
      s_message:[],
      s_lable: '',
      message:'',
      c_time: '',
      back_m:'',
      id_n:'',
      show_1:false,
    },

    onLoad: function (options) {
      var that = this;  //必须有
      wx.getStorage({
      key: 'user_id',    //缓存数据时的关键字，保持一致
      success: function (r) {
        console.log(r.data);  //成功后回调的函数
        that.setData({
         u_id:r.data
        })
       
        //console.log(that.data.user_number)
      },
      fail: function () {      //失败后回调的函数
        console.log('读取id发生错误')
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

      var this_1 = this;
      db.collection('S_message').orderBy('time', 'desc').get({
        success(r) {
          //console.log(r.data)
          //console.log(this);
          //console.log(r.data[0]);
          this_1.setData({
            s_message: r.data
          })
        }
      })
    //console.log()
    
  },
  onPullDownRefresh: function () {
    this.setData({
      s_label:'',
      message: '',
      back_m:'',
      show_1: false,

    })
    this.onLoad();
  },
  onInput_1(e) {
    this.setData({
      s_label: e.detail
    });
  },
  onInput_2(e) {
    var data_time = util.formatTime1(new Date(), "yyyy-MM-dd HH:mm")
    this.setData({
      message: e.detail,
      c_time: data_time
    });
  },
  //点击提交公告传数据到数据库
  submit: function (e) {
    var number = wx.getStorageSync('user_number')
    var s_lable = this.data.s_label;
    //console.log(s_lable)
    var message = this.data.message;
    var time = this.data.c_time
    if (s_lable === '') {
      Toast.fail('请填写标题')
    } else if (message === '') {
      Toast.fail('请填写内容')
    } else {
      db.collection('S_message').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          number:number,
          lable: s_lable,
          message: message,
          time: time

        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          //console.log(res.data);
          //console.log(res.errMsg);
          Toast.success('留言成功');
        }
      })

      this.onPullDownRefresh()

    }

  },
  //删除公告
  delete_m: function (e) {
    var s_number = wx.getStorageSync('user_number') //  获取登陆id
    let number = e.currentTarget.dataset.text;
    //console.log(s_number);
    //console.log(e.currentTarget);
    if (s_number === number) {
      //console.log(e.currentTarget.id)
      let id = e.currentTarget.id;
      const db = wx.cloud.database();
      db.collection("S_message").doc(id).remove({
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

  },

  reback: function(e) {
    let id = e.currentTarget.id;
    //console.log(e.currentTarget.id)
    this.setData({ show_1: true,
      id_n:id })
    //console.log(this.data.id_n)
  },
  onClose_1() {
    this.setData({ show_1: false });
  },
onChange(e){
  this.setData({
    back_m:e.detail
  })
},
  //添加留言回复
  onConform(e){
    var back_m = this.data.back_m;
    if (back_m === '') {
      Toast.fail('请输入留言');
    } else {
      const db = wx.cloud.database();
      db.collection('S_message').doc(this.data.id_n).update({
        data: {
          back_m: back_m,
        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
        },
        fail: console.error,
      })
      this.onPullDownRefresh()
    }

  }
  
})