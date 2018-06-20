import {iocService} from './iocService'

function UserService() {
}

UserService.prototype.currentUserId = function () {
    return 'admin'
}

UserService.prototype.currentUserName = function () {
    return '管理员'
}

/**
 * {@link UserService}
 */
export const userService = iocService.addBean(UserService);