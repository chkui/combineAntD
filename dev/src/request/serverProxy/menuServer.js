import {getResultSet} from '../../database/menuDao'
import {resultToList} from './commonServer'

export const menuGetAll = (params, cb) => {
    getResultSet(null, [{column: 'sort', flag: 'ASC'}], (err, resultSet)=>{
        cb(err, resultToList(resultSet));
    });
}