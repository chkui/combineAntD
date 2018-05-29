export const site = [
    {
        id: '3cc37fd45e2b11e890efdf877fdb62ce',
        label: '棕榈生态城镇股份有限公司',
        code: 'palmEco',
        shortLabel: '棕榈',
        createTime: 1527040262519,
        createUser: 'admin',
        modifyTIme: 1527040262519,
        modifyUser: 'admin',
        OP: 'ENABLE', //ENABLE,DELETE,DISABLE
    }, {
        id: '5b71f6095e2b11e89c57bdb3fe53720a',
        label: '棕榈设计股份有限公司',
        code: 'palmDesign',
        shortLabel: '棕榈设计',
        fkParent: {id: '5b71f6095e2b11e89c57bdb3fe53720a', label: '棕榈生态城镇股份有限公司'},
        createTime: 1527040262519,
        createUser: 'admin',
        modifyTIme: 1527040262519,
        modifyUser: 'admin',
        OP: 'ENABLE', //ENABLE,DELETE,DISABLE
    }, {
        id: '7234d5bd5e2b11e8bf12c1ce31002780',
        label: '棕榈体育股份有限公司',
        code: 'palmSport',
        shortLabel: '棕榈体育',
        fkParent: {id: '5b71f6095e2b11e89c57bdb3fe53720a', label: '棕榈生态城镇股份有限公司'},
        parent: 'palmEco',
        createTime: 1527040262519,
        createUser: 'admin',
        modifyTIme: 1527040262519,
        modifyUser: 'admin',
        OP: 'ENABLE', //ENABLE,DELETE,DISABLE编码
    }
]