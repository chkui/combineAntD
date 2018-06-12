//input
import {RegularIdEntry, RegularIdItem} from './input/regularId'
import {TextEntry, TextItem, TextRead} from './input/text'
import {EmailEntry, EmailItem} from './input/email'
import {RegularTimerEntry, RegularTimerItem} from './input/regularTimer'
import {RegularUserEntry, RegularUserItem} from './input/regularUser'

//select
import {StandardSelectEntry, StandardSelectItem} from './select/standard'
import {CascaderEntry, CascaderItem} from './select/cascader'

//switch
import {TFSwitchEntry, TFSwitchItem} from './switch/tfSwitch'

//dynamic
import {SimpleDynamicEntry, SimpleDynamicItem} from './dynamic/simpleDynamic'

//listSearchItem
import Search from '../list/searchItem/searchs'



/**
 * 所有的数据Input都接受同样的接口数据
 * 所有的searchItem也是都接收同样的接口数据。
 */

/**
 *
 * @type {{Input: {PK: {Def, Form: RegularIdItem, ListSearch: {Comp: Text, Query}, Read: null}, RegularTimer: {Def, Form: RegularTimerItem, ListSearch: {Comp: Text, Query}, Read: null}, RegularUser: {Def, Form: RegularUserItem, ListSearch: {Comp: Text, Query}, Read: null}, Text: {Def: TextEntry, Form: TextItem, ListSearch: {Comp: Text, Query}, Read: TextRead}, Email: {Def: EmailEntry, Form: EmailItem, ListSearch: {Comp: Text, Query}, Read: null}}, Select: {Standard: {Def: StandardSelectEntry, Form, ListSearch: {Comp: *, Query}, Read: null}, Cascader: {Def: CascaderEntry, Form: CascaderItem, ListSearch: {Comp: *, Query}, Read: null}}, Switch: {TFSwitch: {Def: TFSwitchEntry, Form: TFSwitchItem, ListSearch: {Comp: *, Query}, Read: null}}}}
 */
const Items = {
    Input: {
        PK: {
            Def: RegularIdEntry,
            Form: RegularIdItem,
            ListSearch: Search.Input.Text,
            Read: null
        },
        RegularTimer:{
            Def: RegularTimerEntry,
            Form: RegularTimerItem,
            ListSearch: Search.Input.Text,
            Read: null
        },
        RegularUser:{
            Def: RegularUserEntry,
            Form: RegularUserItem,
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
    },
    Dynamic:{
        Simple:{
            Def: SimpleDynamicEntry,
            Form: SimpleDynamicItem,
            ListSearch: Search.Select.Standard, //对应的列表搜索组件
            Read: null
        }
    }
};

export default Items