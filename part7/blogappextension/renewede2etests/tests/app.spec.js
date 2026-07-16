const { test, expect, beforeEach, describe } = require('@playwright/test')
const { createBlog, loginPredef } = require('./helper')

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
      await page.goto('/login')
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
      await page.goto('/login')
      await loginPredef(page, 'root', 'root')
      console.log('2a')
      await expect(page.getByText('Login successful')).toBeVisible()
      console.log('2b')
    })

    
    test('fails with wrong credentials', async ({ page }) => {
      await page.goto('/login')
      await loginPredef(page, 'sockpuppet', 'phonier')
      console.log('3a')
      await expect(page.getByText('Wrong credentials')).toBeVisible()
      console.log('3b')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
      await page.goto('/login')
      await loginPredef(page, 'phone', '3310')
      await page.waitForTimeout(1000)
      await page.screenshot({ path: 'debug.png' })
      await createBlog(page, 'Aaaffb', 'TDWDe', 'https://vwrq.qeqsd', '2')
      await createBlog(page, 'Aaaffc', 'TDWDF', 'https://vwrq.qeqsd', '4')
      await page.waitForTimeout(1000)
      await page.screenshot({ path: 'debug1.png' })
      await createBlog(page, 'Aaaffd', 'TDWDg', 'https://vwrq.qeqsd', '8')
      await createBlog(page, 'Aaaffe', 'TDWDH', 'https://vwrq.qeqsd', '16')
      await createBlog(page, 'Aaafff', 'TDWDi', 'https://vwrq.qeqsd', '32')
      await page.waitForTimeout(1000)
      await page.screenshot({ path: 'debug2.png' })
      await page.getByText('Logout').click()
      await page.goto('/')
      await page.getByText('Login').click()
      await page.waitForTimeout(1000)
      await loginPredef(page, 'root', 'root')
      await page.waitForTimeout(1000)
      await page.goto('/')
    })

    test('Blog creation is fully functional', async ({ page }) => {
      await createBlog(page, 'Teriyaki', 'TDW', 'https://teri.yaki', '64')
      console.log('4a')
      await page.goto('/')
      await page.waitForTimeout(1000)
      await page.screenshot({ path: 'debug4.png' })
      await expect(page.locator('.blogitem', { hasText: 'Teriyaki' })).toBeVisible()
      console.log('4b')
      await expect(page.locator('.blogitem', { hasText: 'Teriyaki by TDW' })).toBeVisible()
      console.log('4c')
    })

    test('Blog can be liked', async ({ page }) => {
      console.log('5a')
      await page.goto('/')
      await page.getByRole('link', { name: /Aaaffb/i }).click()
      console.log('5b')
      await page.getByRole('button', { name: 'Like' }).click()
      console.log('5c')
      await expect(page.getByText('3')).toBeVisible()
    })

    test('Blog can be deleted', async ({ page }) => {
      await createBlog(page, 'Teriyaki', 'TDW', 'https://teri.yaki', '64')
      console.log('6a')
      await page.goto('/')
      await page.waitForTimeout(1000)
      await page.screenshot({ path: 'debug4.png' })
      await expect(page.locator('.blogitem', { hasText: 'Teriyaki' })).toBeVisible()
      console.log('6b')
      await expect(page.locator('.blogitem', { hasText: 'Teriyaki by TDW' })).toBeVisible()
      console.log('6c')
      await page.getByRole('link', { name: /Teriyaki/i }).click()
      console.log('6d')
      await page.getByRole('button', { name: 'Remove blog' }).click()
      console.log('6e')
      await page.goto('/')
      await expect(page.getByText('Teriyaki')).toHaveCount(0)
    })
    
  })

})
