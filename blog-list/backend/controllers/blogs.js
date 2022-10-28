const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')
const blog = require('../models/blog')
const { response } = require('../app')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 })
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

// comments

blogRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    console.log(request.body.comment)
  const newblog = {
    ...blog,
    comments: blog.comments.push(request.body.comment),
  }
  const updated = await Blog.findByIdAndUpdate(request.params.id, newblog, {
    new: true,
  })
  console.log(updated)
  response.status(201).json(updated)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const user = await User.findById(request.user.id)

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    comments: [],
    date: new Date(),
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = await User.findById(request.user.id)
  if (!(blog.user.toString() === user.id)) {
    response.status(401).json({ error: 'invalid user' })
  }
  await blog.remove()
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    user: body.user._id,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedBlog)
})

module.exports = blogRouter
