const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe('Direct database tests', () => {
    beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlog)
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

    test('POST request to add blog is functional', async () => {
        const newBlog = {
        title: 'Grifter 60-year-old yells at cloud again',
        author: 'Dude is in a sex offender list',
        url: 'https://www.youtube.com/watch?v=godhateswome',
        likes: 16,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.title)

        assert.strictEqual(response.body.length, helper.initialBlog.length + 1)
        assert(contents.includes('Grifter 60-year-old yells at cloud again'))
    })

    test('Ensure Mongoose returns all blog posts as uniquely identified id', async () => {
        const response = await api.get('/api/blogs')
        assert("id" in response.body[0])
        assert(!("_id" in response.body[0]))
    })

    test('POST request to add blog works even if likes property is undefined', async () => {
        const newBlog = {
        title: 'Grifter 60-year-old yells at cloud again',
        author: 'Dude is in a sex offender list',
        url: 'https://www.youtube.com/watch?v=godhateswome',
        }

        await api
            .post('/api/blogs')
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
        const newBlog = {
        author: 'Dude is in a sex offender list',
        url: 'https://www.youtube.com/watch?v=godhateswome',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('POST request spits out 400 if url is missing', async () => {
        const newBlog = {
        title: 'Grifter 60-year-old yells at cloud again',
        author: 'Dude is in a sex offender list',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

after(async () => {
    await mongoose.connection.close()
})
