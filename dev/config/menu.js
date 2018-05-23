export const before = [{
    id:'ca9ff02b5e6411e89b17a388ea92ae70',
    code: 'portals',
    label: '桌面',
    url: '/'
}];
export const after = [{
    id:'488789365e6511e88ce87fae8ccec962',
    code: 'options',
    label: '管理员功能',
    children: [
        {id:'631bbc395e6511e8bec9c3e1038a5664', code: 'siteConfig', label: '站点', form: '2a36fc3d5e3e11e883bb516681d29dd6'},
        {id:'6aba6b355e6511e8a146f3fb9447c503', code: 'ddConfig', label: '数据字典', form: '123456'}
    ]
}]
export const menuAttribute = {
    theme:'dark',
    mode:'inline',
    defaultOpenKeys: ['portals']
}

export default {
    before,
    after,
    menuAttribute
}