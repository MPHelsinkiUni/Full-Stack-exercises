import { create } from 'zustand'
import blogService from './services/blogs'
import loginService from './services/login'

const useBlogStore = create((set, get) => ({
    blogs: [],
    user: null,
    username: '',
    password: '',
    notification: { text: null, type: null },
    actions: {
        initialize: async () => {
            const blogs = await blogService.getAll()
            set(() => ({ blogs }))

            const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
            if (loggedUserJSON) {
                const userStr = JSON.parse(loggedUserJSON);
                set({ user: userStr })
                blogService.setToken(userStr.token);
            }
        },
        setNotification: async value => {
            set({ notification: { text: value.text, type: value.type } })
            setTimeout(() => {
                set({ notification: { text: null, type: null } })
            }, 5000)
        },
        setBlogs: async (blogs) => {
            set({ blogs })
        },
        setUser: async (user) => {
            set({ user })
        },
        addBlog: async (blogObject, user) => {
            const newBlog = await blogService.create(blogObject);
            const newerBlog = {
                ...newBlog,
                user: user,
                };
            const blogs = get().blogs
            set({ blogs: blogs.concat(newerBlog) });
        },
        updateBlog: async (id, blogObject) => {
            const returnedBlog = await blogService.update(id, blogObject);
            const blogs = get().blogs
            const updatedBlog = {
                ...returnedBlog,
                user: blogs.find((blog) => blog.id === id).user,
            };
            set({ blogs: blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)) });
        },
        removeBlog: async (blogObject) => {
            const blogs = get().blogs
            const confirmDelete = window.confirm(`Delete ${blogObject.title}?`);
            if (!confirmDelete) {
                return;
            }
            await blogService
            .removal(blogObject.id)
            .then((response) => {
                set({ blogs: blogs.filter((blog) => blog.id !== blogObject.id) });
                get().actions.setNotification({
                    text: `Removal of blog successful!`,
                    type: "success",
                });
            })
            .catch((error) => {
                get().actions.setNotification({
                    text: `Error: ${error.response.data.error}`,
                    type: "error",
                });
            });
        },
        login: async (event) => {
            event.preventDefault();
            const username = get().username
            const password = get().password
            try {
                const user = await loginService.login({ username, password });
                window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
                blogService.setToken(user.token);
                set({ user: user });
                set({ username: '' });
                set({ password: '' });
                get().actions.setNotification({
                    text: `Login successful! Welcome ${username}`,
                    type: "success",
                });
                return true;
            } catch (error) {
                get().actions.setNotification({
                    text: `Bad credentials! Check your password or username`,
                    type: "error",
                });
                return false;
            }
        },
        logOut: async (event) => {
            try {
                window.localStorage.removeItem("loggedBlogappUser");
                window.localStorage.clear();
                set({ user: null });
                set({ username: '' });
                set({ password: '' });
                get().actions.setNotification({
                    text: `Logout successful!`, 
                    type: "success" 
                });
            } catch (error) {
                get().actions.setNotification({
                    text: `Logout issue. Please bother your local admin!`,
                    type: "error",
                });
            }
        },
        handleUsernameChange: (event) => {
            console.log(event.target.value);
            set({ username: event.target.value });
        },
        handlePasswordChange: (event) => {
            console.log(event.target.value);
            set({ password: event.target.value });
        },
    }
}))

export const useBlogsListing = () => useBlogStore((state) => state.blogs)
export const useNotification = () => useBlogStore((state) => state.notification)
export const useStoreActions = () => useBlogStore((state) => state.actions)
export const useKeptUsername = () => useBlogStore((state) => state.user)
export const useUsernameData = () => useBlogStore((state) => state.username)
export const usePasswordData = () => useBlogStore((state) => state.password)

export default useBlogStore
