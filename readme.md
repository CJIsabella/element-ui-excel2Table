## 1、包简介

这是专门为elment-ui的table表格造的轮子，能够实现excel文档的导入和导出，安装和使用方法请继续往下浏览。

## 2、安装

npm i element-ui-excel2table

## 3、使用

#### excelToTable(file, object)

参数说明：
file: 是使用el-upload组件onChangeFile事件的参数；
object: object对象的value必须和excel表格的表头名称相同，否则会报错，key值可以自己命名。

返回值：包含每一条数据对象的数组。

#### tableToExcel(selector, excelName)

参数说明：
selector: element-ui的table选择器；
excelName: 导出文件自命名。

注：若有不足，欢迎批评指正
