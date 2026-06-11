const dummy = (blogs) => { 
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((entry, blog) => blog.likes > entry.likes ? blog : entry)
}

const mostBlogs = (blogs) => {
    const authors = {}

    blogs.forEach(blog => {
        authors[blog.author] = (authors[blog.author] || 0) + 1
    })

    let authorOfOne = ``
    let blogOfOne = 0

    for (const author in authors) {
        if (authors[author] > blogOfOne) {
            blogOfOne = authors[author]
            authorOfOne = author
        }
    }

    return {
        author: authorOfOne,
        blogs: blogOfOne
    }
}

const mostLikes = (blogs) => {
    const authors = {}

    blogs.forEach(blog => {
        authors[blog.author] = (authors[blog.author] || 0) + blog.likes
    })

    let authorOfOne = ``
    let likeOfOne = 0

    for (const author in authors) {
        if (authors[author] > likeOfOne) {
            likeOfOne = authors[author]
            authorOfOne = author
        }
    }

    return {
        author: authorOfOne,
        likes: likeOfOne
    }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
