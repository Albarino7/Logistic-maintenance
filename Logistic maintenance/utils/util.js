const formatTime = time => {
  const hour = time.getHours()
  const minute = time.getMinutes()

  return [hour + '时', minute + '分'].map(formatNumber).join(':')
}

const formatTime1 = function(date, fmt){
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate() 
  const hour = date.getHours()
  const minute = date.getMinutes()

  if(fmt == "yyyy-MM-dd HH:mm"){
    return [year + '年', month + '月', day + '日'].map(formatNumber).join('/') +' '+ [hour, minute].map(formatNumber).join(':')
  }
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const formatDate = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

  return [year + '年', month + '月', day + '日'].map(formatNumber).join('-')
}

module.exports = {
    formatTime: formatTime,
    formatDate: formatDate,
  formatTime1: formatTime1
}

