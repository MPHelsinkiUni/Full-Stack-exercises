const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

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

test('GET request gets the right amount of notes', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlog.length)
    })

after(async () => {
        await mongoose.connection.close()
    })

