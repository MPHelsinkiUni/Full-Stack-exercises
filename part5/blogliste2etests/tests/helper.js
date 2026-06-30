const loginPredef = async (page, username, password) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByLabel('Username').fill(username)
    await page.getByLabel('Password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url, likes) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByLabel('Title').fill(title)
    await page.getByLabel('Author').fill(author)
    await page.getByLabel('Url').fill(url)
    await page.getByLabel('Likes').fill(likes)
    await page.getByRole('button', { name: 'send' }).click()
    await page.getByText(title).waitFor()
}

const logOut = async (page) => {
    await page.getByRole('button', { name: 'Logout' }).click()
    await page.getByRole('button', { name: 'login' }).waitFor()
}

export { createBlog, loginPredef, logOut }
