import {getResultSet} from '../../database/menuDao'

export const getAll = (params, cb) =>{
    getResultSet(null, cb);
}