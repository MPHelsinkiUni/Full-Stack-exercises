import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('Content is rendered', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "True",
    url: "https://your.mom",
    likes: 25
  }

  const user = {

  }

  const likeUpdate
  
  const removeBlog

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})
