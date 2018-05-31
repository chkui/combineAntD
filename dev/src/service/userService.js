import {iocService} from './iocService'

function UserService() {
}

UserService.prototype.currentUser = function () {
    return 'admin'
}

/**
 * {@link UserService}
 */
export const userService = iocService.addBean(UserService);