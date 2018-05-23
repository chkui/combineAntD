export const menuReducer = (state = {menus: false}, action) => {
    switch (action.type) {
        case 'menuTreeData':
            return {menus: action.menus}
        default:
            return state;
    }
}