var data = {
  arr: [
    
  ]
}
// 根据name得到对应的id
function nametoid(name) {
  for (let i = 0; i < data.arr.length; i++) {
    if (name == data.arr[i].ch) {
      return data.arr[i].id
    }
  }
}
function idtoname(id) {
  for (let i = 0; i < data.arr.length; i++) {
    if (id == data.arr[i].id) {
      return data.arr[i].ch
    }
  }
}
module.exports = {
  nametoid: nametoid,
  data: data,
  idtoname: idtoname
}