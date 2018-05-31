//input
import {PKEntry, PKItem} from './input/pk'
import {TextEntry, TextItem, TextRead} from './input/text'
import {EmailEntry, EmailItem} from './input/email'

//select
import {StandardSelectEntry, StandardSelectItem} from './select/standard'
import {CascaderEntry, CascaderItem} from './select/cascader'

//switch
import {TFSwitchEntry, TFSwitchItem} from './switch/tfSwitch'

//listSearchItem
import Search from '../list/searchItem/searchs'

/**
 * 所有的数据Input都接受同样的接口数据
 * 所有的searchItem也是都接收同样的接口数据。
 */

/**
 *
 * @type {{Input: {PK: {Def: PKEntry, Form: PKItem, Read: null}, Text: {Def: TextEntry, Form: TextItem, Read: TextRead}, Email: {Def: EmailEntry, Form: EmailItem, Read: null}}, Select: {Standard: {Def: StandardSelectEntry, Form, Read: null}, Cascader: {Def: CascaderEntry, Form: CascaderItem, Read: null}}, Switch: {TFSwitch: {Def: TFSwitchEntry, Form: TFSwitchItem, Read: null}}}}
 */
const Items = {
    Input: {
        PK: {
            Def: PKEntry,
            Form: PKItem,
            ListSearch: Search.Input.Text,
            Read: null
        },
        Text: {
            Def: TextEntry, //基本组件，不提供联合表单提交的功能
            Form: TextItem, //表单组件，提供配合表单验证，规则校验，数据联动的功能
            ListSearch: Search.Input.Text, //默认的列表搜索组件，也可以在表单结构上设置，如果设置为true或其他有效数据，启用默认组件
            Read: TextRead //只读组件，用于展示
        },
        Email: {
            Def: EmailEntry,
            Form: EmailItem,
            ListSearch: Search.Input.Text,
            Read: null
        }
    },
    Select: {
        Standard: {
            Def: StandardSelectEntry,
            Form: StandardSelectItem,
            ListSearch: Search.Select.Standard, //对应的列表搜索组件
            Read: null
        },
        Cascader: {
            Def: CascaderEntry,
            Form: CascaderItem,
            ListSearch: Search.Select.Standard, //对应的列表搜索组件
            Read: null
        },
    },
    Switch: {
        TFSwitch: {
            Def: TFSwitchEntry,
            Form: TFSwitchItem,
            ListSearch: Search.Select.Standard, //对应的列表搜索组件
            Read: null
        }
    }
};

export default Items