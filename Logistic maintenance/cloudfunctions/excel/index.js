// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init(
  { env: 'dlzc-m5fft'  }
  )


var xlsx = require('node-xlsx');
const db = cloud.database()


exports.main = async (event, context) => {
  let {   fileID  } = event
  //1,通过fileID下载云存储里的excel文件
  const res = await cloud.downloadFile({
    fileID: fileID,
  })
  const buffer = res.fileContent

  const tasks1 = [] //用来存储所有的添加数据操作
  const tasks2 = []
  const tasks3 = []
  const tasks4 = []
  const tasks5 = []
  //2,解析excel文件里的数据
  var sheets = xlsx.parse(buffer); //获取到所有sheets
  sheets.forEach(function (sheet) {
    console.log(sheet['name']);
    for (var rowId in sheet['data']) {
      console.log(rowId);
      var row = sheet['data'][rowId]; //第几行数据
      if (rowId > 0 && row) { //第一行是表格标题，所有我们要从第2行开始读
        //3，把解析到的数据存到excelList数据表里
          if(row[0] =='student'){
            const promise = db.collection('student')
            .add({
              data: {
               // upload_p:event.upload_p,
                id: row[0],         //用户种类
                name: row[1],       //姓名
                number: row[2],     //学号/工号
                password: row[3],   //登录密码
                phone_n:row[4],     //手机号
              }
            })
          tasks1.push(promise)
          }else if(row[0] =='teacher'){
            const promise = db.collection('teacher')
            .add({
              data: {
                id: row[0],         //用户种类
                name: row[1],       //姓名
                number: row[2],     //学号/工号
                password: row[3],   //登录密码
                phone_n:row[4],     //手机号
              }
            })
          tasks2.push(promise)
          }else if(row[0] =='worker'){
            const promise = db.collection('worker')
            .add({
              data: {
                id: row[0],         //用户种类
                name: row[1],       //姓名
                number: row[2],     //学号/工号
                password: row[3],   //登录密码
                phone_n:row[4],     //手机号
                type:row[5]         //工人工种
              }
            })
          tasks3.push(promise)
          }else if(row[0] =='S_manager'){
            const promise = db.collection('s_manager')
            .add({
              data: {
                id: row[0],         //用户种类
                name: row[1],       //姓名
                number: row[2],     //学号/工号
                password: row[3],   //登录密码
                phone_n:row[4],     //手机号
              }
            })
          tasks4.push(promise)
          }else if(row[0] =='W_manager'){
            const promise = db.collection('w_manager')
            .add({
              data: {
                id: row[0],         //用户种类
                name: row[1],       //姓名
                number: row[2],     //学号/工号
                password: row[3],   //登录密码
                phone_n:row[4],     //手机号
              }
            })
          tasks5.push(promise)
          }
      }
    }
  });

  // 等待所有数据添加完成
  let result = await Promise.all(tasks1,tasks2,tasks3,tasks4,tasks5).then(res => {
    return res
  }).catch(function (err) {
    return err
  })
  return result
  //console.log(result)
}
