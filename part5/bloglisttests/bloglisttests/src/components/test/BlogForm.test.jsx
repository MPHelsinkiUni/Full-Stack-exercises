import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../BlogForm'
import Togglable from '../Togglable'
import { describe } from 'vitest'


describe('<Togglable />', () => {
  beforeEach(() => {
    render(
      <Togglable buttonLabel="show...">
        <div>togglable content</div>
      </Togglable>
    )
  })

  test('The form calls the event handler it received as props with the right details when a new blog is created.', async () => {
    const mockHandler = vi.fn()
    const user = userEvent.setup()

    render(
        <BlogForm createBlog={mockHandler} />
    )

    const title = screen.getByLabelText("Title")
    const author = screen.getByLabelText("Author")
    const url = screen.getByLabelText("Url")
    const likes = screen.getByLabelText("Likes")
    const sendButton = screen.getByText("send")
    
    await user.type(title, 'Preamble Per')
    await user.type(author, 'Mee')
    await user.type(url, 'http://no.deez')
    await user.type(likes, '20')
    await user.click(sendButton)

    console.log(mockHandler.mock.calls.content)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('Preamble Per')
    expect(mockHandler.mock.calls[0][0].author).toBe('Mee')
    expect(mockHandler.mock.calls[0][0].url).toBe('http://no.deez')
    expect(mockHandler.mock.calls[0][0].likes).toBe('20')
  })
})
