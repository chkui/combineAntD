import db from '../database/data'
import {ListOption} from '../../config/sysDefConfig'
import {dataBindService} from './dataBindService'
import {fluent} from 'es-optional'

function ListService() {
}

/**
 * 搜索数据
 * @param {string} fsId
 * @param {string} fsType
 * @param {object} where 查询条件 详见{@link https://github.com/louischatriot/nedb}find部分说明
 * @param {object} options 排序分页扩增操作
 * @param {object} options.sort 指定排序字段，格式为{column: -1或1}
 * @param {number} options.curPage 当前在第几页
 * @param {number} options.size 单页的数据个数
 * @param {function} cb (err, docs, total, start, end) 查询成功的回调
 *     err 错误信息
 *     docs返回的文档
 *     total 数据总量
 *     start 查询结果的开始位置
 *     end 查询结果的结束位置
 */
ListService.prototype.find = function (fsId, fsType, where, options, cb) {
    db.listQuery(fsId, fsType, where, options, cb);
}

/**
 * 将进入列表的数据进行一次转换以符合列表的要求。
 * 1)将所有的id字段映射到key。
 * 2)处理固定字段'OP'，将ENABLE/DISABLE/DELETE映射到true/false/false。当出现非ENABLE/DISABLE/DELETE的字符串时，均映射为false。
 *
 * @param formStructure 每一个表单项的属性
 * @param formDocs 数据列表
 */
ListService.prototype.bindData = function (formStructure, formDocs) {
    return dataBindService.listData2Comp(formStructure, formDocs);
};

/**
 * 针对Antd列表组件以及自定义的表头来组装搜索数据
 * 1) //TODO 需要根据不同的接口在这个地方完成适配功能
 * 2) //TODO 当前使用的是 nedb数据库， 查询、排序、分页条件查看{@link https://github.com/louischatriot/nedb}find部分说明
 * 3) 需要注意这个功能严重和Antd的Table {@link https://ant.design/components/table-cn/} 组件、Nedb耦合。
 * @param {object} where 历史查询条件
 * @param {object} options 历史分页&排序条件
 * @param {object} search 搜索条件数据
 * @param {string} search.column 修改条件的字段
 * @param {object} search.value 修改的数值
 * @param {object} page 组件分页数据
 * @param {number} page.current 当前页面，Antd组件是从1开始
 * @param {object} filters 组件过滤条件 //TODO 未启用
 * @param {object} sorter 组件排序条件
 * @param {string} sorter.field 排序操作的表单域
 * @param {string} sorter.order 排序的顺序['descend'|'ascend']=[降序|升序]
 * @returns {{
 *      where:{ 查询条件
 *          column:'query'
 *      },
 *      options:{
 *          sort:{column:'desc|asc'} 排序字段
 *          curPage:1 当前页面
 *          size:10 单个页面的个数
 *      }
 * }}
 */
ListService.prototype.antdQueryToDBSupport = function (where = {}, options = {}, search, page, filters, sorter) {
    //组装新的options
    const opts = {};
    opts.sort = fluent(sorter).then(sort => sorter.order).then(order => sorter.field).then(() => ({})).then(sort => {
        sort[sorter.field] = 'descend' === sorter.order ? 'desc' : 'asc';
        return sort;
    }).else(false);
    opts.curPage = (page && page.current) ? page.current - 1 : options.curPage;
    //根据结构比对数据是否修改
    const isOpts = options.curPage !== opts.curPage || (() => {
        let m = false;
        if (options.sort) {
            const keys = Object.keys(options.sort),
                key = keys && keys[0];
            if (key) {
                m = opts.sort[key] !== options.sort[key]
            } else {
                m = false;
            }
        } else if (opts.sort) {
            m = true;
        }
        m && (opts.curPage = 0);//排序条件变化，要回到第一页
        return m;
    })();

    //构建where
    let whe = where, isWhe = false;
    if(where !== search){
        whe = search;
        isWhe = true;
    }
    return (isOpts || isWhe) ? {
        where: whe,
        options: opts
    } : false
}

/**
 *
 * @type {ListService}
 */
export const listService = new ListService();
export default ListService