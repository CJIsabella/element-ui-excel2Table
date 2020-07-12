const XLSX = require('xlsx')
const FileSaver = require('file-saver')

module.exports = {
  // excel的导入
  onChangeFile(file) {
    const cj = { name: '姓名', age: '年龄', workAge: '工作年限' }
    // console.log(file)
    // console.log('file', file, file.raw.constructor)
    if (!file) {
      // 没有文件
      return false
    } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
      // 格式根据自己需求定义
      console.log('上传格式不正确，请上传xls或者xlsx格式')
      return false
    }

    const fileReader = new FileReader()
    const arr = []
    fileReader.onload = async ev => {
      const data = ev.target.result
      const workbook = XLSX.read(data, {
        type: 'binary' // 以字符编码的方式解析
      })
      const exlname = workbook.SheetNames[0] // 取第一张表
      const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname]) // 生成json表格内容
      console.log('json---------', exl)
      exl.map(v => {
        const obj = {}
        for (var item in cj) {
          obj[item] = v[cj[item]]
        }
        arr.push(obj)
      })
    }
    fileReader.readAsBinaryString(file.raw)
    console.log(arr, '---arr')
  },


  // excel的导出
  output() {
    // 转换成excel时，使用原始的格式
    var xlsxParam = { raw: true }
    var wb = XLSX.utils.table_to_book(
      document.querySelector('#mytable'),
      xlsxParam
    )
    var wbout = XLSX.write(wb, {
      bookType: 'xlsx',
      bookSST: true,
      type: 'array'
    })
    try {
      FileSaver.saveAs(
        // charset=utf-8 以文本格式保存才会和原表格数据一样显示
        new Blob([wbout], { type: 'application/octet-stream;charset=utf-8' }),
        'monitorGQI.xlsx'
      )
    } catch (e) {
      if (typeof console !== 'undefined') console.log(e, wbout)
    }
    return wbout
  }
}