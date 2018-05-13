/**
 * 数据类型表，由系统初始化内置，只能由开发人员配置，对应表单数据类型
 */

/**
 *
 * 数据类型全局定义。
 * 1)为了增强性能，降低前后端耦合，数据类型使用字符串来表述，例如'string','document','number'
 * 如果由需要可以根据需要扩展，扩展任意类型必须核心开发人员讨论。任何新的类型都会影响表单数据的结构
 * @type {{
 *      string: {name: string, des: string},
 *      document: {name: string, des: string},
 *      number: {name: string, des: string},
 *      int: {name: string, des: string},
 *      array: {name: string, des: string},
 *      attachmentImg: {name: string, des: string}}}
 */
export const dataType ={
    string:{
        name:'字符串',
        des:'字符串类型，可以是任意常规非富文本类型字符串'
    },
    document:{
        name:'文档',
        des:'富文本类型文档，该类型谨防XSS攻击，需要在数据库级别和前端防范'
    },
    number:{
        name:'数字',
        des:'数字类型，如果没有指定，默认为范围为+-[18.6](正负范围内18位整数，6位小数)'
    },
    int:{
        name:'整型',
        des:'整数集合，number的子集，取值+-[18]'
    },
    array:{
        name:'列表',
        des:'该类型数据为一组列表，列表的格式需要按类型定义，例如[{data:1, type:"string"}]'
    },
    attachmentImg:{
        name:'图片附件',
        des:'图片类型的上传附件，支持jpg,png,bmp,gif等常规数据类型'
    }
}