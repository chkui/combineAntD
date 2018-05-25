//input
import {PKEntry} from './input/pk'
import {TextEntry} from './input/text'
import {EmailEntry} from './input/email'

//select
import {StandardEntry} from './select/standard'
import {CascaderEntry} from './select/cascader'

//switch
import {TFSwitchEntry} from './switch/tfSwitch'

/**
 *
 * @type {{Input: {Text: {Entry: TextEntry, Read: null}, Email: {Entry: EmailEntry, Read: null}}, Select: {Standard: {Entry: StandardEntry, Read: null}, Cascader: {Entry: CascaderEntry, Read: null}}}}
 */
const Items = {
    Input: {
        PK:{
            Entry: PKEntry,
            Read: null
        },
        Text: {
            Entry: TextEntry,
            Read: null
        },
        Email: {
            Entry: EmailEntry,
            Read: null
        }
    },
    Select: {
        Standard: {
            Entry: StandardEntry,
            Read: null
        },
        Cascader: {
            Entry: CascaderEntry,
            Read: null
        },
    },
    Switch: {
        TFSwitch: {
            Entry: TFSwitchEntry,
            Read: null
        }
    }
};

export default Items