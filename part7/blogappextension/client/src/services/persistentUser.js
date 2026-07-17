const getUser = () => {
    return window.localStorage.getItem("loggedBlogappUser")
}
const saveUser = (user) => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
}
const removeUser = () => {
    window.localStorage.removeItem('loggedBlogappUser')
}
const clearAll = () => {
    window.localStorage.clear()
}


export default { getUser, saveUser, removeUser, clearAll }
