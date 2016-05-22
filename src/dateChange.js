export default function dateChange (date) {
  let dateTmp = new Date()
  let year = date.substr(0, 4)
  let month = date.substr(4, 2)
  let day = date.substr(6, 2)

  dateTmp.format = function (fmt) {
    let year = this.getFullYear()
    let month = this.getMonth() + 1

    fmt = fmt.replace('yyyy', year)
    fmt = fmt.replace('yy', year % 100)
    fmt = fmt.replace('MM', fix(month))
    fmt = fmt.replace('dd', fix(this.getDate()))
    fmt = fmt.replace('hh', fix(this.getHours()))
    fmt = fmt.replace('mm', fix(this.getMinutes()))
    return fmt
    function fix (n) {
      return n < 10 ? '0' + n : n
    }
  }

  dateTmp.setFullYear(year, month - 1, day - 1)
  console.log(dateTmp.toLocaleString())
  let outStr = dateTmp.format('yyyyMMdd')
  console.log(outStr)
  return outStr
}
