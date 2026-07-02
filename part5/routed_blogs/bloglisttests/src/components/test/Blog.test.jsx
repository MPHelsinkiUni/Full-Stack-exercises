import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../Blog'

test('Content is rendered', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "True",
    url: "https://your.mom",
    likes: 25,
    user: {
        username: "root"
    }
  }

  const user = {
    username: "root",
    name: "root",
    password: "root"
  }

  render(<Blog blog={blog} user={user}/>)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})

test('URL and likes are not rendered by default ...', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "True",
    url: "https://your.mom",
    likes: 25,
    user: {
        username: "root"
    }
  }

  const user = {
    username: "root",
    name: "root",
    password: "root"
  }

  render(<Blog blog={blog} user={user}/>)

  expect(screen.queryByText('https://your.mom')).not.toBeInTheDocument()
  expect(screen.queryByText('25')).not.toBeInTheDocument()
})

test('... but are rendered when the details button pressed.', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "True",
    url: "https://your.mom",
    likes: 25,
    user: {
        username: "root"
    }
  }

  const user = {
    username: "root",
    name: "root",
    password: "root"
  }

  render(<Blog blog={blog} user={user}/>)

  expect(screen.queryByText('https://your.mom')).not.toBeInTheDocument()
  expect(screen.queryByText('25')).not.toBeInTheDocument()

  const interact = userEvent.setup()
  const button = screen.getByText('Show details')
  await interact.click(button)

  expect(screen.queryByText('https://your.mom')).toBeDefined()
  expect(screen.queryByText('25')).toBeDefined()
})

test('The event handler is called twice with the like button clicked twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "True",
    url: "https://your.mom",
    likes: 25,
    user: {
        username: "root"
    }
  }

  const user = {
    username: "root",
    name: "root",
    password: "root"
  }

  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} user={user} likeUpdate={mockHandler}/>
  )

  const interact = userEvent.setup()
  const button = screen.getByText('Show details')
  await interact.click(button)
  const likey_me = screen.getByText('like')
  await interact.click(likey_me)
  await interact.click(likey_me)

  expect(mockHandler.mock.calls).toHaveLength(2)
})


/*
{
  "_id": {
    "$oid": "5a422a851b54a676234d17f7"
  },
  "title": "Updated Title",
  "author": "Updated Author",
  "url": "Updated url",
  "user": {
    "$oid": "6a3a9400857505dceaf4aff3"
  },
  "likes": 8,
  "__v": 0
}
*/
