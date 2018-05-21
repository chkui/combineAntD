import {TextEntry} from './input/text'
import {EmailEntry} from './input/email'

//select
import {StandardEntry} from './select/standard'
import {CascaderEntry} from './select/cascader'

/**
 *
 * @type {{Input: {Text: {Entry: TextEntry, Read: null}, Email: {Entry: EmailEntry, Read: null}}, Select: {Standard: {Entry: StandardEntry, Read: null}, Cascader: {Entry: CascaderEntry, Read: null}}}}
 */
const Items = {
    Input: {
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
    }
};

export default Items