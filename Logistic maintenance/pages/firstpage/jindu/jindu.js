// pages/jindu/jindu.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        text: '步骤一',
        desc: '维修单提交'
      },
      {
        text: '步骤二',
        desc: '审核通过'
      },
      {
        text: '步骤三',
        desc: '维修完成'
      },
      {
        text: '步骤四',
        desc: '评价反馈'
      }
    ],
    u_number:'',
    star:'',
    comment:'',
    show_1:false,
    progress:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var arr=[];
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

    db.collection('Repair_order').get({
      success(r) {
        var arr1=[];
        //console.log(r.data)
        //console.log(this);
        //console.log(r.data[0]);
        for (let i = 0; i < r.data.length; i++) {
          arr.push(r.data[i])
        } 
        //console.log(arr[0])
        //console.log(arr.length)
        //console.log(arr[0].usernumber)
        //判断当前登陆人员是否有报修记录
        for(let j=0; j<arr.length; j++){
          if (that.data.u_number == arr[j].usernumber){
            //console.log(arr[j])
            arr1.push(arr[j])
          }
        }
        //console.log(arr1)
        that.setData({
          progress: arr1
        })
      }
    })
    
  },
  onChange_1(e) {
    this.setData({
      star: e.detail,
    });
   // console.log(e.detail)
    
  },
  result_c: function (e) {
    console.log(e.currentTarget.dataset.act)
    if (e.currentTarget.dataset.act == 2){
      let id = e.currentTarget.id;
      console.log(e.currentTarget.id)
      this.setData({
        show_1: true,
        id_n: id
      })
    //console.log(this.data.id_n)    
    }else{
      Toast.fail('不是评价时间')
    }
    
  },
  onClose_1() {
    this.setData({ show_1: false });
  },
  onChange_2(e) {
    this.setData({
      comment: e.detail
    })
  },
  onConform(){
    var comment = this.data.comment;
    var star = this.data.star;
    if (comment === '') {
      Toast.fail('请输入评价');
    }else if(star === ''){
      Toast.fail('请评星级');
    }else{
      const db = wx.cloud.database();
      db.collection('Repair_order').get().then
      (r => {
        
            db.collection('Repair_order').doc(this.data.id_n).update({
              data: {
                comment: comment,
                star: star,
                action:'3'
              },
              success: function (res) {

                console.log(res)
              },
              fail: console.error,
            })
            this.onPullDownRefresh()
      }) 
      
      
    }
    
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
    this.setData({
      star: '',
      comment: '',
      show_1: false,

    })
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