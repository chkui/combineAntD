import {menuReducer} from './redux/menuReducer'
import {formStructureReducer} from './redux/formReducer'
import {listDataReducer} from './redux/listReducer'

const reducers = {
    menuReducer,
    formStructureReducer,
    listDataReducer
}
module.exports = reducers
module.exports.default = module.exports