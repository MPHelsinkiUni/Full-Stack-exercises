const { test, expect, beforeEach, describe } = require('@playwright/test')
const { createBlog, loginPredef, logOut } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
        data: {
            username: "root",
            name: "root",
            password: "root"
        }
    })
    await request.post('/api/users', {
        data: {
            username: "phone",
            name: "nokia",
            password: "3310"
        }
    })
    await page.goto('/')
    
  })
  
  describe('Login', () => {
    test('Login form is shown', async ({ page }) => {
      console.log('1a')
      await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
      await page.getByRole('button', { name: 'login' }).click()
      console.log('1b')
      await expect(page.getByLabel('Username')).toBeVisible();
      await expect(page.getByLabel('Password')).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
      console.log('1c')
    })

  
    test('succeeds with correct credentials', async ({ page }) => {
      await loginPredef(page, 'root', 'root')
      console.log('2a')
      await expect(page.getByText('Login successful')).toBeVisible()
      console.log('2b')
      await expect(page.getByText('root logged in')).toBeVisible()
      console.log('2c')
    })

    
    test('fails with wrong credentials', async ({ page }) => {
      await loginPredef(page, 'sockpuppet', 'phonier')
      console.log('3a')
      await expect(page.getByText('Wrong credentials')).toBeVisible()
      console.log('3b')
    })
    
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginPredef(page, 'phone', '3310')
      await createBlog(page, 'Aaaffa', 'TDWDD', 'https://vwrq.qeqsd', '1')
      await createBlog(page, 'Aaaffb', 'TDWDe', 'https://vwrq.qeqsd', '2')
      await createBlog(page, 'Aaaffc', 'TDWDF', 'https://vwrq.qeqsd', '4')
      await createBlog(page, 'Aaaffd', 'TDWDg', 'https://vwrq.qeqsd', '8')
      await createBlog(page, 'Aaaffe', 'TDWDH', 'https://vwrq.qeqsd', '16')
      await createBlog(page, 'Aaafff', 'TDWDi', 'https://vwrq.qeqsd', '32')
      await logOut(page)
      await loginPredef(page, 'root', 'root')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Blog title', 'Blog author', 'https://Blog.url', '20')
      console.log('4a')
      await expect(page.locator('.blogitem', { hasText: 'Blog title' })).toBeVisible()
      console.log('4b')
      await expect(page.getByText('by Blog author')).toBeVisible()
      console.log('4c')
    })

    
    test('the blog can be liked', async ({ page }) => {
      await createBlog(page, 'Bloggy', 'Blog author', 'https://Blog.url', '20')
      console.log('5a')
      const blogButton = page.locator('.blogitem').filter({ hasText: 'Bloggy' })
      await blogButton.getByRole('button', { name: 'Show details'}).click()
      await page.getByRole('button', { name: 'like' }).click()
      console.log('5b')
      await expect(page.getByText('likes 21')).toBeVisible()
      console.log('5c')
    })

    test('delete visibility is functional', async ({ page }) => {
      await createBlog(page, 'Blogde', 'Blog author', 'https://Blog.url', '20')
      console.log('6a')

      page.on('dialog', async dialog => {
        console.log(dialog.message())
        expect(dialog.type()).toContain("confirm")
        expect(dialog.message()).toContain("Delete Blogde?")
        await dialog.accept()
      })

      const blogButton = page.locator('.blogitem').filter({ hasText: 'Blogde' })
      await blogButton.getByRole('button', { name: 'Show details'}).click()
      await expect(blogButton.getByRole('button', { name: 'Remove blog' }))
      await blogButton.getByRole('button', { name: 'Remove blog' }).click()

      await expect(page.getByText('Blogde')).toHaveCount(0);
    })

    /*
    test('restricted only to the user who added the blog', async ({page}) => {

    })
    */
  })
    
})
