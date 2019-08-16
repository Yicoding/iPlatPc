const userInfo = (state = {}, action) => {
    const { type, userInfo } = action
    switch (type) {
        case 'SET_USERINFO':
            return userInfo
        default:
            return state
    }
}

export default userInfo