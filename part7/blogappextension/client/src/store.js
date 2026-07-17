import { create } from 'zustand'
import blogService from './services/blogs'
import loginService from './services/login'
import persistentUser from './services/persistentUser'

const useBlogStore = create((set, get) => ({
    blogs: [],
    user: null,
    notification: { text: null, type: null },
    actions: {
        initialize: async () => {
            const blogs = await blogService.getAll()
            set(() => ({ blogs }))

            const loggedUserJSON = persistentUser.getUser();
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
            try {
                const user = await loginService.login({ username: event.target.username.value, password: event.target.password.value });
                persistentUser.saveUser(user);
                blogService.setToken(user.token);
                set({ user: user });
                get().actions.setNotification({
                    text: `Login successful! Welcome ${event.target.username.value}`,
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
                persistentUser.removeUser();
                persistentUser.clearAll();
                set({ user: null });
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
    }
}))

export const useBlogsListing = () => useBlogStore((state) => state.blogs)
export const useNotification = () => useBlogStore((state) => state.notification)
export const useStoreActions = () => useBlogStore((state) => state.actions)
export const useKeptUsername = () => useBlogStore((state) => state.user)

export default useBlogStore
