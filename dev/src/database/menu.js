import {userDesk, options} from '../../config/menu'
import db from './db'

/**
 * 获取所有菜单
 * @param {function} cb (err, docs) err:查询错误的原因， 返回的查询结果
 */
export const allMenu = (cb) => {
    db.query('d_menu', {OP:'ENABLE'}, {}, cb);
}

export const addMenu = (menu) =>{

}

export const modifyMenu = (menu) =>{

}

export const deleteMenu = (menu) =>{

}