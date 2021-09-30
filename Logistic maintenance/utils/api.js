const baseurl = "http://localhost:3306/dlzc"
const api = {
  loginurl: baseurl +'/userinfo',
  uploadurl: baseurl + '/upload',
  repairflurl: baseurl +'/student_t',
  bxrecurl: baseurl +'/inquireinfo',
  repairtime: baseurl +'/repairtime'
}
module.exports = api;