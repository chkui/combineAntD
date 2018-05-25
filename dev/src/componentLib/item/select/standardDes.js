//每个item负担的des文件问该组件对应的form配置选项的描述文件，今后修改为标准文档
//
const Structure = {
    /**
     * 组件所属分类
     */
    category: 'Select',
    /**
     * 组件所属类型
     */
    type: 'Standard',
    /**
     * 组件对应的字段名称
     */
    column: 'relParent',
    /**
     * 组件对应的label描述
     */
    label: '上级站点',
    /**
     * 组件在编辑时出现的提示内容
     */
    tip: '站点的从属关系，该站点从属与上级站点',
    /**
     * 标记是否在列表中显示
     */
    listShow: 1,
    /**
     * 标记是否可以用于查询
     */
    search: 1,
    // 以下为组件专有属性
    /**
     * select用于标记下拉菜单在选择时的外关联的数据项表单数据项目。
     * 数据项目可以是标准的站点数据、数据字典、人员、权限、资产项、流程项。
     * 根据id和Label的对应关系来关联。
     *
     * 组件会根据form、type、ids参数进行查询，返回的结构为:
     * [{id, label},{id, label, children:[{id, label}]}]
     * 该组件只支持2级菜单
     */
    select: {
        empty: 1, //是否支持空选项
        form: 'static_d_site', //关联表单
        type: 'static', //关联表单类型
        ids: false //[]，可以进行多项数据关联，如果关联字段不存在或为空，则全表关联
    }
}