import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

const db = wx.cloud.database({});
const repair = db.collection('Repair_order');
//const dlzc = db.collection('dlzc');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    u_id: '',
    repair:[],
    s_ser: [],
    t_ser: [],
    jxl_ser: [],
    bgl_ser: [],
    qt_ser: [],

    dlzc_wa: [],
    dlzc_e: [],
    dlzc_wo: [],
    dlzc_o: [],
    c_worker: '',
    reject_r:'',
    show_1: false,
    show_2: false,
   // columns_2: []

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
    db.collection('Repair_order').get({
      success(r) {
        //console.log(r.data)
        //console.log(this);
        //console.log(r.data[0]);
        var arr_a = [];
        var arr_b = [];
        var arr_c = [];
        var arr_d = [];
        var arr_e = [];
       // that.setData({ repair: r.data  })
       for(let m = 0; m<r.data.length; m++){
         var r_sort = r.data[m].sort
         var action = r.data[m].action
         if (r_sort == '宿舍楼' && action == '0') {
           arr_a.push(r.data[m])
         } else if (r_sort == '家属院' && action == '0'){
           arr_b.push(r.data[m])
         } else if (r_sort == '教学楼' && action == '0') {
           arr_c.push(r.data[m])
         } else if (r_sort == '办公楼' && action == '0') {
           arr_d.push(r.data[m])
         } else if (r_sort == '其他建筑' && action == '0'){
           arr_e.push(r.data[m])
         }     
       }
        that.setData({
          s_ser: arr_a,
          t_ser: arr_b,
          jxl_ser: arr_c,
          bgl_ser: arr_d,
          qt_ser: arr_e
        })
      }
    })

    db.collection('worker').get({
      success(r) {
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var arr4 = [];
        for (var i = 0; i < r.data.length; i++) {
          //console.log(r.data[i].id)
            //arr.push(r.data[i])  //循环数据进数组
            if (r.data[i].type === '水管工') {
              arr1.push(r.data[i].name)
            } else if (r.data[i].type === '电工') {
              arr2.push(r.data[i].name)
            } else if (r.data[i].type === '木工') {
              arr3.push(r.data[i].name)
            } else {
              arr4.push(r.data[i].name)
            }
        }
        //console.log(arr)
        that.setData({
          dlzc_wa: arr1,
          dlzc_e: arr2,
          dlzc_wo: arr3,
          dlzc_o: arr4,
        })
        //console.log(that.data.dlzc_wa)
      }
    })
  },
  //我要报修界面点击事件
  tap_1() {
    var id = wx.getStorageSync('user_id') //  获取登陆id
    if (id === 'student') {
      wx.navigateTo({
        url: '../susheWx/susheWx',
      })
    } else {
      Toast.fail('您不是学生');
    }
  },
  tap_2() {
    var id = wx.getStorageSync('user_id')
    if (id === 'teacher') {
      wx.navigateTo({
        url: '../teacherBuild/teacherBuild',
      })
    } else {
      Toast.fail('您不是教师');
    }
  },
  tap_3() {
    var id = wx.getStorageSync('user_id')
    if (id === 'student' || id === 'teacher') {
      wx.navigateTo({
        url: '../JXbuild/JXbuild',
      })
    } else {
      Toast.fail('您无权报修');
    }
  },
  tap_4() {
    var id = wx.getStorageSync('user_id')
    if (id === 'teacher') {
      wx.navigateTo({
        url: '../BGLbuild/BGLbuild',
      })
    } else {
      Toast.fail('您不是教师');
    }
  },
  tap_5() {
    var id = wx.getStorageSync('user_id')
    if (id === 'student' || id === 'teacher') {
      wx.navigateTo({
        url: '../QTbuild/QTbuid',
      })
    } else {
      Toast.fail('您无权报修');
    }
  },
//派遣维修工点击事件
  tap_6() {
    wx.navigateTo({
      url: '../management/water/water',
    })
  },
  tap_7() {
    wx.navigateTo({
      url: '../management/electric/electric',
    })
  },
  tap_8() {
    wx.navigateTo({
      url: '../management/wood/wood',
    })
  },
  tap_9() {
    wx.navigateTo({
      url: '../management/other/other',
    })
  },

  //点击禁用标签
  onClickDisabled(e) {
    //console.log(e.detail)
    if (e.detail.name === 0) {
      Toast.fail('您无权报修')
    } else if (e.detail.name === 1) {
      Toast.fail('您无权审核')
    } else {
      Toast.fail('您无权查看/派遣维修工')
    }
  },

  //拒绝按钮popup包含事件
  onClose_1() {
    this.setData({ show_1: false });
  },
  onChange_1(e) {
    this.setData({ reject_r: e.detail })
  },
  onConform_1(e) {
    var reject_r = this.data.reject_r;
    if (reject_r === '') {
      Toast.fail('请输入拒绝理由');
    } else {
      var u_number = wx.getStorageSync('user_number')
      const db = wx.cloud.database();
      db.collection('Repair_order').doc(this.data.id_n).update({
        data: {
          action:'-1',
          reject_reason: reject_r,
          w_manager: u_number
        },
        success: function (res) {  // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
        },
        fail: console.error,
      })
    }
    this.onPullDownRefresh()
  },


  //“通过”按钮popup包含事件
  onClose_2() {
    this.setData({ show_2: false });
  },

  onChange_2(e) {
    const { picker, value, index } = e.detail;
    //console.log(value, index);
  },

  onConfirm_2(e) {
    const { picker, value, index } = e.detail;
    //console.log(value, index);
    this.setData({
      c_worker: value,
      show_2: false
    })
    // console.log(this.data.c_worker)
    let id = this.data.id_n;   //从onPass_1获取id
    //console.log(id)
    var worker = this.data.c_worker;
    var u_number = wx.getStorageSync('user_number')
    const db = wx.cloud.database();
    db.collection('Repair_order').doc(id).update({
      data: {
        action:'1',
        worker: worker,
        w_manager:u_number,
      },
      success: function (res) {     // res 是一个对象
        console.log(res)
      },
      fail: console.error,
    })
    this.onPullDownRefresh()
  },

  onCancel_2() {
    this.setData({ show_2: false });
  },

  //点击拒绝按钮事件
  onReject(e) {
    let id = e.currentTarget.id;
    //console.log(e.currentTarget.id)
    this.setData({
      id_n: id,
      show_1: true,
    })
  },
//宿舍报修点击通过按钮事件
  onPass_1(e) {
    let id = e.currentTarget.id;
    let fault = e.currentTarget.dataset.fault;
    var arr1 = this.data.dlzc_wa;
    var arr2 = this.data.dlzc_e;
    var arr3 = this.data.dlzc_wo;
    var arr4 = this.data.dlzc_o;
    let arr5 = arr3.concat(arr4);
    var reg1 = new RegExp('水');
    var reg2 = new RegExp('电');
    //console.log(e.currentTarget.id)
    this.setData({
      id_n: id,
      show_2:true,
    })
    if (fault.match(reg1)){
      this.setData({  columns_2: arr1  })
    // console.log(this.data.columns_2)
    } else if (fault.match(reg2)){
      this.setData({  columns_2: arr2  })
    }else{
      this.setData({  columns_2: arr5  })
    }
    
  }, 
  //家属院报修点击通过按钮事件
  onPass_2(e) {
    let id = e.currentTarget.id;
    let fault = e.currentTarget.dataset.fault;
    var arr = this.data.t_ser;
    var arr1 = this.data.dlzc_wa;
    var arr2 = this.data.dlzc_e;
    var arr3 = this.data.dlzc_wo;
    var arr4 = this.data.dlzc_o;
    let arr5 = arr3.concat(arr4);
    var reg1 = new RegExp('水');
    var reg2 = new RegExp('电');
    var reg3 = new RegExp('家具');
    //console.log(e.currentTarget.id)
    this.setData({
      id_n: id,
      show_2: true
    })
    //console.log(this.data.id_n)
    if (fault.match(reg1)) {
      this.setData({ columns_2: arr1 })
      // console.log(this.data.columns_2)
    } else if (fault.match(reg2)) {
      this.setData({ columns_2: arr2 })
    } else if (fault.match(reg3)) {
      this.setData({ columns_2: arr5 })
    } else {
      this.setData({ columns_2: arr4 })
    }
  },

  //教学楼报修点击通过按钮事件
  onPass_3(e) {
    let id = e.currentTarget.id;
    let fault = e.currentTarget.dataset.fault;
    var arr = this.data.jxl_ser;
    var arr1 = this.data.dlzc_wa;
    var arr2 = this.data.dlzc_e;
    var arr3 = this.data.dlzc_wo;
    var arr4 = this.data.dlzc_o;
    let arr5 = arr3.concat(arr4);
    var reg1 = new RegExp('水');
    var reg2 = new RegExp('电');
    //console.log(arr5)
    //console.log(e.currentTarget.id)
    this.setData({
      id_n: id,
      show_2: true
    })
    //console.log(this.data.id_n)
    if (fault.match(reg1)) {
      this.setData({ columns_2: arr1 })
      // console.log(this.data.columns_2)
    } else if (fault.match(reg2)) {
      this.setData({ columns_2: arr2 })
    } else {
      this.setData({ columns_2: arr5 })
    } 
  },
 
  //办公楼报修点击通过按钮事件
  onPass_4(e) {
    let id = e.currentTarget.id;
    let fault = e.currentTarget.dataset.fault;
    var arr = this.data.bgl_ser;
    var arr1 = this.data.dlzc_wa;
    var arr2 = this.data.dlzc_e;
    var arr3 = this.data.dlzc_wo;
    var arr4 = this.data.dlzc_o;
    let arr5 = arr3.concat(arr4);
    var reg1 = new RegExp('水');
    var reg2 = new RegExp('电');
    //console.log(arr5)
    //console.log(e.currentTarget.id)
    this.setData({
      id_n: id,
      show_2: true
    })
    //console.log(this.data.id_n)
    if (fault.match(reg1)) {
      this.setData({ columns_2: arr1 })
      // console.log(this.data.columns_2)
    } else if (fault.match(reg2)) {
      this.setData({ columns_2: arr2 })
    } else {
      this.setData({ columns_2: arr5 })
    } 
  },
  
  //其他报修点击通过按钮事件
  onPass_5(e) {
    let id = e.currentTarget.id;
    let fault = e.currentTarget.dataset.fault;
    var arr = this.data.qt_ser;
    var arr1 = this.data.dlzc_wa;
    var arr2 = this.data.dlzc_e;
    var arr3 = this.data.dlzc_wo;
    var arr4 = this.data.dlzc_o;
    let arr5 = arr3.concat(arr4);
    var reg1 = new RegExp('水');
    var reg2 = new RegExp('电');
    //console.log(arr5)
    //console.log(e.currentTarget.id)
    this.setData({
      id_n: id,
      show_2: true
    })
    //console.log(this.data.id_n)
    if (fault.match(reg1)) {
      this.setData({ columns_2: arr1 })
      // console.log(this.data.columns_2)
    } else if (fault.match(reg2)) {
      this.setData({ columns_2: arr2 })
    } else {
      this.setData({ columns_2: arr5 })
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
      reject_r: '',
      show_1: false,
      show_2: false,
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