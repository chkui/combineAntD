import {category} from './component'
/**
 * 表单配置信息表，
 * 页面表单布局采用横向转换4-2-1布局（思考是否需要贪心算法步进位置），组件根据需要会占据4到1格的位置
 * @type {{type: string, column: *[]}}
 */
const formDefine = {
    type:'flow', //表单所属业务类型，['flow'|'asset'] 流程表单|资产表单
    bussId:'123456',//所属业务关键主键，标识该表单对应的业务或流程
    columnMetaSet:[ //描述字段-名称-组件-长度限定，{}
        {
            key:'',
            name:'', //字段名称
            /**
             * {@link category}
             */
            component:{
                /**
                 * 组件所属分类
                 */
                category:'',
                /**
                 * 组件标识
                 */
                component:''
            }, //字段对应的组件, 组件类型
            length:10 //字段长度，根据组件的不同，表述方式有所差异
        },
    ]
}