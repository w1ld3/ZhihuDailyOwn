export default function dateChange (date) {
  let year = date.substr(0, 4)
  let month = date.substr(4, 2)
  let day = date.substr(6, 2)
  let newDate = new Date()
  newDate.setFullYear(year, month - 1, day)
  let dateStr = month + '月' + day + '日 星期'
  switch (newDate.getDay()) {
    case 0: dateStr += '一'
      break
    case 1: dateStr += '二'
      break
    case 2: dateStr += '三'
      break
    case 3: dateStr += '四'
      break
    case 4: dateStr += '五'
      break
    case 5: dateStr += '六'
      break
    case 6: dateStr += '七'
      break
    default: dateStr += '系统错误'
  }
  return dateStr
}
