const array_1 = {
  '用水故障': ['厕所', '水池', '水管', '水表', '其他'],
  '用电故障': ['照明', '电扇', '空调', '插座', '其他'],
  '燃气故障': ['煤气灶', '热水器', '燃气开关', '其他'],
  '家具故障': ['床', '书桌', '门', '窗', '其他'],
};
const array_2 = {
  '1单元': ['101', '102', '201', '202', '301', '302', '401', '402', '501', '601', '602'],
  '2单元': ['101', '102', '201', '202', '301', '302', '401', '402', '501', '601', '602'],
  '3单元': ['101', '102', '201', '202', '301', '302', '401', '402', '501', '601', '602'],
  '4单元': ['101', '102', '201', '202', '301', '302', '401', '402', '501', '601', '602'],
  '5单元': ['101', '102', '201', '202', '301', '302', '401', '402', '501', '601', '602'],
  
};
const util = require('../../utils/util.js');
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_0: false,
    show_1: false,
    show_2: false,
    show_3: false,
    show_4: false,
    show_5: false,
    columns_1: ['家属楼10号','家属楼11号', '家属楼12号', '家属楼13号', '家属楼14号', '家属楼15号', '家属楼16号', '家属楼17号', '家属楼18号', '家属楼19号'],
    columns_2: [
      {
        values: Object.keys(array_1),
        className: 'column1'
      },
      {
        values: array_1['用水故障'],
        className: 'column2',
      },

    ],
    columns_5: [
      {
        values: Object.keys(array_2),
        className: 'column1'
      },
      {
        values: array_2['1单元'],
        className: 'column2',
      },

    ],
    currentDate_1: new Date().getTime(),
    currentDate_2: '12:00',
    minDate: new Date().getTime(),
    minHour: 9,
    maxHour: 17,
    tempFilePaths: [],
    //以下为上传图片至云存储
    images_fileID: [],
    build_n: '',
    fault_d: '',

    formatter_1(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else if (type === 'day') {
        return `${value}日`;
      }
      return value;
    },
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
          u_number: r.data
        })

        //console.log(that.data.user_number)
      },
      fail: function () {      //失败后回调的函数
        console.log('读取user_number发生错误')
      }
    })

    wx.getStorage({
      key: 'user_name',    //缓存数据时的关键字，保持一致
      success: function (r) {
        console.log(r.data);  //成功后回调的函数
        that.setData({
          name: r.data
        })

        //console.log(that.data.user_number)
      },
      fail: function () {      //失败后回调的函数
        console.log('读取name发生错误')
      }
    })
    wx.getStorage({
      key: 'user_phone',    //缓存数据时的关键字，保持一致
      success: function (r) {
        console.log(r.data);  //成功后回调的函数
        that.setData({
          phone: r.data
        })

        //console.log(that.data.user_number)
      },
      fail: function () {      //失败后回调的函数
        console.log('读取phone发生错误')
      }
    })


  },
//单击？弹出框
  onClickIcon() {
    this.setData({ show_0: true });
    Dialog.alert({
      title: '提示',
      message: '*星号为必填内容'
    }).then(() => {
      this.onClose_0()
    });
  },
  //选择家属院弹出框
  onClose_0() {
    this.setData({ show_0: false });
  },
  showPopup_1() {
    this.setData({ show_1: true })
  },
  onClose_1() {
    this.setData({ show_1: false });
  },
  onCancel_1() {
    this.setData({ show_1: false });
  },
  onChange_1(e) {
    const { picker, value, index } = e.detail;
    //console.log(value, index);
  },
  onConfirm_1(e) {
    const { picker, value, index } = e.detail;
    //console.log(value, index);
    this.setData({
      build: value,
      show_1: false
    })
  },

//选择门牌号弹出框
  showPopup_5() {
    this.setData({ show_5: true })
  },

  onClose_5() {
    this.setData({ show_5: false });
  },
  onCancel_5() {
    this.setData({ show_5: false });
  },
  onChange_5(e) {
    const { picker, value, index } = e.detail;
    picker.setColumnValues(1, array_2[value[0]]);
  },
  onConfirm_5(e) {
    const { picker, value, index } = e.detail;
    //console.log(value, index);
    this.setData({
      build_n: `${value[0]}-${value[1]}`,
      show_5: false
    })
  },

  showPopup_2() {
    this.setData({ show_2: true })
  },

  onClose_2() {
    this.setData({ show_2: false });
  },
  onCancel_2() {
    this.setData({ show_2: false });
  },
  onChange_2(e) {
    const { picker, value, index } = e.detail;
    picker.setColumnValues(1, array_1[value[0]]);
  },
  onConfirm_2(e) {
    const { picker, value, index } = e.detail;
    //console.log(value, index);
    this.setData({
      fault: `${value[0]}-${value[1]}`,
      show_2: false
    })
  },


  showPopup_3() {
    this.setData({ show_3: true })
  },
  onClose_3() {
    this.setData({ show_3: false });
  },
  onCancel_3() {
    this.setData({ show_3: false });
  },
  onInput_3(e) {
    this.setData({ currentDate_1: e.detail });
    //console.log(e.detail)
  },
  onConfirm_3(e) {
    var newDate = new Date(e.detail);
    newDate = util.formatDate(newDate);
    this.setData({
      show_3: false,
      c_date: newDate,
    });
  },

  showPopup_4() {
    this.setData({ show_4: true })
  },
  onClose_4() {
    this.setData({ show_4: false });
  },
  onCancel_4() {
    this.setData({ show_4: false });
  },
  onInput_4(e) {
    this.setData({
      currentDate_2: e.detail
    });
    //console.log(e.detail[3])
  },
  onConfirm_4(e) {
    this.setData({
      c_time: e.detail,
      show_4: false,
    });
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

  ChooseImg: function () {
    let that = this;
    wx.chooseImage({
      count: 5, // 默认最多9张图片，可自行更改
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        Toast.loading({
          mask: true,
          message: '正在提交...'
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePath = res.tempFilePaths;
        that.setData({
          tempFilePaths: tempFilePath
        })
      }
    })
  },
  //预览图片
  PreviewImg: function (e) {
    let index = e.target.dataset.index;
    let that = this;
    //console.log(that.data.tempFilePaths[index]);
    //console.log(that.data.tempFilePaths);
    wx.previewImage({
      current: that.data.tempFilePaths[index],
      urls: that.data.tempFilePaths,
    })
  },
  //长按删除图片
  DeleteImg: function (e) {
    var that = this;
    var tempFilePaths = that.data.tempFilePaths;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          //console.log('点击确定了');
          tempFilePaths.splice(index, 1);
        } else if (res.cancel) {
          //console.log('点击取消了');
          return false;
        }
        that.setData({
          tempFilePaths
        });
      }
    })
  },

  build_nInput: function (e) {
    this.setData({
      build_n: e.detail
    });
  },
  detialInput: function (e) {
    this.setData({
      fault_d: e.detail
    });
  },
 
  // 上传图片至云数据库
  UploadBtntap: function (e) {
    var count = 0;
    var h = this.data.tempFilePaths.length;
    if (h != 0) {
      this.setData({
        images_fileID: []
      })
    }
    for (let i = 0; i < h; i++) {
      //上传文件
      var imageUrl = this.data.tempFilePaths[i].split("/");
      var name = imageUrl[imageUrl.length - 1];
      var images_fileID = this.data.images_fileID;
      let item_1 = this.data.tempFilePaths[i];
      let suffix = /\.\w+$/.exec(item_1)[0];
      wx.cloud.uploadFile({
        cloudPath: new Date().getTime() + suffix,     //自定义云存储路径
        filePath: this.data.tempFilePaths[i],
        success: res => {
          images_fileID.push(res.fileID);
          wx.hideLoading()
          Toast.success('上传图片成功');
          this.setData({
            images_fileID: images_fileID         //更新data中的 fileID
          })
          //console.log(images_fileID)
          fail: res => {
            count++;
            wx.hideToast();
            wx.showToast({
              title: '错误提示',
              content: '上传图片失败',
              showCancel: false,
              success: function (res) {

              }
            })
          }
        }
      });
    }

    let that = this;
    var realName = this.data.name;
    var phone = this.data.phone;
    var usernumber = this.data.u_number;
    var build = this.data.build;
    var buildN = this.data.build_n;
    var fault = this.data.fault;
    var fault_detial = this.data.fault_d;
    var res_date = this.data.c_date;
    var res_time = this.data.c_time;
    if (build === '') {
      Toast.fail('请选择要报修的家属院');
     
    } else if (buildN === '') {
      Toast.fail('请选择要报修的具体住址');
    
    } else if (fault === '') {
      Toast.fail('请选择故障种类');
     
    } else if (fault_detial === '') {
      Toast.fail('请填写故障细节');
     
    } else if (res_date === '') {

      Toast.fail('请选择预约日期');

    } else if (res_time === '') {

      Toast.fail('请选择预约时间');
    }

    else {
      // 初始化数据库
      const db = wx.cloud.database();
      db.collection('Repair_order').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          sort:'家属院',
          usernumber: usernumber,
          realName: realName,
          phone: phone,
          build: build,
          buildN: buildN,
          fault: fault,
          fault_detial: fault_detial,
          res_date: res_date,
          res_time: res_time,
          action: '0',


        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res);
          console.log(res.errMsg);
          Toast.success('提交成功');
        }
      })
      wx.switchTab({
        url: '../Houqinweixiu/HouqinWX'
      })
    }

  }
})
