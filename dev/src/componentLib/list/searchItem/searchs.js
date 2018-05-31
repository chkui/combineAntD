import {Text, textQuery} from './input/text'
import {StandardSelect, standardSelectQuery} from './select/standard'

/**
 *
 * @type {{Input: {Text: {Comp: Text, Query}}, Select: {Standard: {Comp: *, Query}}}}
 */
const Search = {
    Input:{
        Text:{
            Comp:Text,
            query:textQuery
        }
    },
    Select:{
        Standard:{
            Comp:StandardSelect,
            query:standardSelectQuery
        }
    }
}

export default Search