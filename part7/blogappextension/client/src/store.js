import { create } from 'zustand'
import blogService from './services/blogs'

const useBlogStore = create((set, get) => ({
    blogs: [],
    notification: { text: null, type: null },
    actions: {
        initialize: async () => {
            const blogs = await blogService.getAll()
            set(() => ({ blogs }))
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
        addBlog: async (blogObject, user) => {
            const newBlog = await blogService.create(blogObject);
            const newerBlog = {
                ...newBlog,
                user: user,
                };
            const blogs = get()-blogs
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
        }
    }
}))

export const useBlogsListing = () => useBlogStore((state) => state.blogs)
export const useNotification = () => useBlogStore((state) => state.notification)
export const useStoreActions = () => useBlogStore((state) => state.actions)

export default useBlogStore
