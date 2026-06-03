const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const listWithMany = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 1,
      __v: 0
    },
    {
      _id: '110d76848a16ffab27b19404',
      title: 'My name is Slimmy',
      author: 'Marshall Mathers',
      url: 'https://hell.no.pdf',
      likes: 2,
      __v: 0
    },
    {
      _id: '7549d02ec7d337f731f0a759',
      title: 'Earthsea is mega underrated',
      author: 'Ursula K. Le Guin',
      url: 'https://uklg.ca/blog/461',
      likes: 4,
      __v: 0
    },
    {
      _id: '51f517f87a0a1de0a0dd8bb1',
      title: 'Fuck you',
      author: 'Harlan Ellison',
      url: 'https://he.he',
      likes: 8,
      __v: 0
    },
    {
      _id: 'f10e9b425dc3ed116403a198',
      title: 'Grifter 30-year-old yells at cloud again',
      author: 'Dude is in a sex offender list',
      url: 'https://www.youtube.com/watch?v=godhateswome',
      likes: 16,
      __v: 0
    },
    {
      _id: '3eab13e89bda36513fff62b0',
      title: 'Reaction Youtuber 124',
      author: 'Who is this',
      url: 'https://www.youtube.com/watch?v=1sDat_24jSEf',
      likes: 32,
      __v: 0
    },
    {
      _id: '3eab13e89bda36513fff62b1',
      title: 'Reaction Youtuber 125',
      author: 'Who is this #2',
      url: 'https://www.youtube.com/watch?v=1sDat_24jSEg',
      likes: -33,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMany)
    assert.strictEqual(result, 30)
  })
})

describe('identifying specific blog', () => {
  const listWithMany = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 1,
      __v: 0
    },
    {
      _id: '110d76848a16ffab27b19404',
      title: 'My name is Slimmy',
      author: 'Marshall Mathers',
      url: 'https://hell.no.pdf',
      likes: 2,
      __v: 0
    },
    {
      _id: '7549d02ec7d337f731f0a759',
      title: 'Earthsea is mega underrated',
      author: 'Ursula K. Le Guin',
      url: 'https://uklg.ca/blog/461',
      likes: 4,
      __v: 0
    },
    {
      _id: '51f517f87a0a1de0a0dd8bb1',
      title: 'Fuck you',
      author: 'Harlan Ellison',
      url: 'https://he.he',
      likes: 8,
      __v: 0
    },
    {
      _id: 'f10e9b425dc3ed116403a198',
      title: 'Grifter 30-year-old yells at cloud again',
      author: 'Dude is in a sex offender list',
      url: 'https://www.youtube.com/watch?v=godhateswome',
      likes: 16,
      __v: 0
    },
    {
      _id: '3eab13e89bda36513fff62b0',
      title: 'Reaction Youtuber 124',
      author: 'Who is this',
      url: 'https://www.youtube.com/watch?v=1sDat_24jSEf',
      likes: 32,
      __v: 0
    },
    {
      _id: '3eab13e89bda36513fff62b1',
      title: 'Reaction Youtuber 125',
      author: 'Who is this #2',
      url: 'https://www.youtube.com/watch?v=1sDat_24jSEg',
      likes: -33,
      __v: 0
    },
    {
      _id: '110d76848a16fa6127b19404',
      title: 'Fuck all you hoes',
      author: 'Marshall Mathers',
      url: 'https://hell.no.pdf',
      likes: 65,
      __v: 0
    }
  ]

  test('blog with largest likes is identified', () => {
    const result = listHelper.favoriteBlog(listWithMany)
    assert.strictEqual(result.likes, 65)
  })

  test('author with most blogs is identified', () => {
    const result = listHelper.mostBlogs(listWithMany)
    assert.strictEqual(result.author, 'Marshall Mathers')
  })

  test('author with most likes is identified', () => {
    const result = listHelper.mostLikes(listWithMany)
    assert.strictEqual(result.author, 'Marshall Mathers')
  })
})
