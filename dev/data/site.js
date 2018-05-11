/**
 * 站点，网站支持多站点结构，每一项数据（资产数据、流程数据、表单数据、人员数据等）都必须规数到某个站点。
 * 1）目前只考虑人员会出现夸站点的情况，全站提供站点切换功能。每个站点的权限独立。
 * 2）数据字典可以所有站点通用，也可以专属某个站点，通用数据字典以专用符号标记，例如 'siteAll';
 * 3) 站点也可以有从属级关系，//TODO 但是还没有想明白从属关系对实际业务的影响
 * @type {{}}
 */
export const site = {
    palmEco: {
        name: '棕榈生态城镇股份有限公司',
        shortName: '棕榈',
    },
    palmDesign: {
        name: '棕榈设计股份有限公司',
        shortName: '棕榈设计',
        parent: 'palmEco'
    },
    palmSport: {
        name: '棕榈体育股份有限公司',
        shortName: '棕榈体育',
        parent: 'palmSport'
    }
}