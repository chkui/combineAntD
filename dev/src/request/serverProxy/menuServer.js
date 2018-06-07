import {getResultSet} from '../../database/menuDao'

export const menuGetAll = (params, cb) => {
    getResultSet(null, [{column: 'sort', flag: 'ASC'}], cb);
}