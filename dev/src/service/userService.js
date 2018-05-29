function UserService() {
}
UserService.prototype.currentUser = function () {
    return 'admin'
}

export const userService = new UserService();
export default UserService