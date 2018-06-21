import {idGen} from '../idgenerator'
import {SysFlag} from '../../../config/sysDefConfig'

function BaseEntity(props) {
    this.id = props.id || idGen();
    this.op = props.op || SysFlag.DISABLE;
    const date = new Date().getTime()
    this.createuser = props.createuser || 'UNKNOWN';
    this.createtime = props.createtime || date;
    this.modifyuser = props.createuser || 'UNKNOWN';
    this.modifytime = props.modifytime || date;
}