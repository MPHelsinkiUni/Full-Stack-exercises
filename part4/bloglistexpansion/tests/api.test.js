const assert = require('node:assert')
const bcrypt = require('bcrypt')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const helper = require('../utils/test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('Direct database tests', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'testy', name: 'bestie', passwordHash, blogs: [] })

        const userConfirm = await user.save()

        const allforOneUser = helper.initialBlog.map(blog => ({
            ...blog,
            user: userConfirm._id
        }))
        
        const savedBlogs = await Blog.insertMany(allforOneUser)
        userConfirm.blogs = savedBlogs.map(blog => blog._id)
        await userConfirm.save()

        const dummy_users = [
            {
                username: 'adam',
                name: 'Adam E.',
                password: 'terry'
            },
            {
                username: 'eve',
                name: 'Eve A.',
                password: 'alex'
            }
        ]
        
        const dummyObjects = await Promise.all(
            dummy_users.map(async dummy => {
                const dummyHash = await bcrypt.hash(dummy.password, 10)

                return new User({
                    username: dummy.username,
                    name: dummy.name,
                    passwordHash: dummyHash
                })
            })
        )
        await User.insertMany(dummyObjects)
    })

    describe('GET functions', () => {
        test('Ensure Mongoose returns all blog posts as uniquely identified id', async () => {
            const response = await api.get('/api/blogs')
            assert("id" in response.body[0])
            assert(!("_id" in response.body[0]))
        })

        test('GET request gets the blogs as json ', async () => {
            await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        test('GET request gets the right amount of blogs', async () => {
            const response = await api.get('/api/blogs')
            assert.strictEqual(response.body.length, helper.initialBlog.length)
        })
    })

    describe('POST function', () => {
        test('POST request to add blog works even if likes property is undefined', async () => {
            const loginResponse = await api
                .post('/api/login')
                .send({
                    username: 'testy',
                    password: 'sekret'
                })
            token = loginResponse.body.token  

            const user = await User.findOne({})

            const newBlog = {
                title: 'Grifter 60-year-old yells at cloud again',
                author: 'Dude is in a sex offender list',
                url: 'https://www.youtube.com/watch?v=godhateswome',
                userId: user.id,
            }

            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const response = await api.get('/api/blogs')
            const contents = response.body.map(r => r.title)
            const number = response.body.map(u => u.likes)

            assert.strictEqual(response.body.length, helper.initialBlog.length + 1)
            assert(contents.includes('Grifter 60-year-old yells at cloud again'))
            assert(number.includes(0))
        })

        test('POST request spits out 400 if title is missing', async () => {
            const loginResponse = await api
                .post('/api/login')
                .send({
                    username: 'testy',
                    password: 'sekret'
                })
            token = loginResponse.body.token  
            
            const newBlog = {
            author: 'Dude is in a sex offender list',
            url: 'https://www.youtube.com/watch?v=godhateswome',
            }

            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(newBlog)
                .expect(400)
        })

        test('POST request spits out 400 if url is missing', async () => {
            const loginResponse = await api
                .post('/api/login')
                .send({
                    username: 'testy',
                    password: 'sekret'
                })
            token = loginResponse.body.token  

            const newBlog = {
            title: 'Grifter 60-year-old yells at cloud again',
            author: 'Dude is in a sex offender list',
            }

            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(newBlog).expect(400)
        })

        test('POST request to add blog is functional', async () => {
            const loginResponse = await api
                .post('/api/login')
                .send({
                    username: 'testy',
                    password: 'sekret'
                })
            token = loginResponse.body.token  

            const user = await User.findOne({})

            const newBlog = {
                title: 'Grifter 60-year-old yells at cloud again',
                author: 'Dude is in a sex offender list',
                url: 'https://www.youtube.com/watch?v=godhateswome',
                likes: 16,
                userId: user.id
            }

            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const response = await api.get('/api/blogs')
            const contents = response.body.map(r => r.title)

            assert.strictEqual(response.body.length, helper.initialBlog.length + 1)
            assert(contents.includes('Grifter 60-year-old yells at cloud again'))
        })
        
        test('POST request spits out 401 if login is missing', async () => {
            const user = await User.findOne({})

            const newBlog = {
                title: 'Grifter 60-year-old yells at cloud again',
                author: 'Dude is in a sex offender list',
                url: 'https://www.youtube.com/watch?v=godhateswome',
                likes: 16,
                userId: user.id
            }

            await api
                .post('/api/blogs')
                .send(newBlog).expect(401)
        })
    })

    describe('DELETE function', () => {
        test('DELETE request succeeds if id is valid', async () => {
            const loginResponse = await api
                .post('/api/login')
                .send({
                    username: 'testy',
                    password: 'sekret'
                })
            token = loginResponse.body.token  

            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()

            const titles = blogsAtEnd.map((n) => n.title)
            assert(!titles.includes(blogToDelete.title))
            assert.strictEqual(blogsAtEnd.length, helper.initialBlog.length - 1)
        })

        test('DELETE request spits out 401 if if token is missing', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(401)
        })

        test('DELETE request spits out 403 if user is unauthorised', async () => {
            const loginResponse = await api
                .post('/api/login')
                .send({
                    username: 'adam',
                    password: 'terry'
                })
            token = loginResponse.body.token  

            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(403)
        })

    })

    describe('PUT function', () => {
        test('PUT request succeeds if id is valid', async () => {
            const loginResponse = await api
                .post('/api/login')
                .send({
                    username: 'testy',
                    password: 'sekret'
                })
            token = loginResponse.body.token  

            const blogsAtStart = await helper.blogsInDb()
            const blogToReplace = blogsAtStart[0]

            const updatedBlog = {      
                title: 'Send those kids to the Shadow Realm',
                author: 'Edsger W. Dijkstra',
                url: 'https://average.british.schoolteacher',
                likes: 128,
            }

            const blogReplace = await api
                .put(`/api/blogs/${blogToReplace.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updatedBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            
            delete blogReplace.body["id"]
            delete blogReplace.body["user"]

            assert.deepStrictEqual(blogReplace.body, updatedBlog)
        })

        test('PUT request spits out 401 if if token is missing', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToReplace = blogsAtStart[0]

            const updatedBlog = {      
                title: 'Send those kids to the Shadow Realm',
                author: 'Edsger W. Dijkstra',
                url: 'https://average.british.schoolteacher',
                likes: 128,
            }

            await api
                .put(`/api/blogs/${blogToReplace.id}`)
                .send(updatedBlog)
                .expect(401)
        })

        test('PUT request spits out 403 if user is unauthorised', async () => {
            const loginResponse = await api
                .post('/api/login')
                .send({
                    username: 'eve',
                    password: 'alex'
                })
            token = loginResponse.body.token  

            const blogsAtStart = await helper.blogsInDb()
            const blogToReplace = blogsAtStart[0]

            const updatedBlog = {      
                title: 'Send those kids to the Shadow Realm',
                author: 'Edsger W. Dijkstra',
                url: 'https://average.british.schoolteacher',
                likes: 128,
            }

            await api
                .put(`/api/blogs/${blogToReplace.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updatedBlog)
                .expect(403)
        })
    })
})

describe('User program testing', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('Creation of new username', async () => {
        const startUser = await helper.usersInDb()

        const newUser = {
            username: 'epage',
            name: 'Ellison Page',
            password: 'ihaterampricesihateramprices'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const endUsers = await helper.usersInDb()
        assert.strictEqual(endUsers.length, startUser.length + 1)

        const usernames = endUsers.map(user => user.username)
        assert(usernames.includes(newUser.username))
    })

    test('Spits out 400 if username is taken', async () => {
        const startUser = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superman',
            password: 'secret'
        }
        
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const endUser = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(endUser.length, startUser.length)
    })

    test('Spits out 400 if username is too short', async () => {
        const startUser = await helper.usersInDb()

        const newUser = {
            username: 'ro',
            name: 'Superman',
            password: 'secret'
        }
        
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const endUser = await helper.usersInDb()
        assert(result.body.error.includes('is shorter than the minimum allowed length (3)'))

        assert.strictEqual(endUser.length, startUser.length)
    })

    test('Spits out 400 if password is too short', async () => {
        const startUser = await helper.usersInDb()

        const newUser = {
            username: 'rooter_tooter',
            name: 'Superman',
            password: 'se'
        }
        
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const endUser = await helper.usersInDb()
        assert(result.body.error.includes('User validation failed: password: Path `password` is shorter'))

        assert.strictEqual(endUser.length, startUser.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})
