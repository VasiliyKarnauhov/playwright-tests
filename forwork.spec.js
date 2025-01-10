import { test, expect } from '@playwright/test';

test('test 1 Отображение надписи на форме регистрации', async ({ page }) => {
    test.setTimeout(90000);
  await page.goto('https://gymlog.ru/');
  await page.getByRole('link', { name: 'Регистрация' }).click();
  await page.getByRole('button', { name: 'Начать работу бесплатно' }).click();
  await expect(page.locator('#registration')).toContainText('Создайте аккаунт и получите качественный дневник тренировок!');
});

test('test 2 Отображение текста об ошибке при некорректной регистрации', async ({ page }) => {
    test.setTimeout(90000);
    await page.goto('https://gymlog.ru/');
    await page.getByRole('link', { name: 'Регистрация' }).dblclick();
    await page.getByRole('button', { name: 'Начать работу бесплатно' }).click();
    await expect(page.locator('#registration-form')).toContainText('Необходимо заполнить «Электронная почта».');
  });

  test('test 3 Отображение текста на странице зарегистрированного пользователя', async ({ page }) => {
    await page.goto('https://gymlog.ru/');
    await page.getByRole('link', { name: 'Регистрация' }).click();
    await page.locator('input[type="text"]').click();
    await page.locator('input[type="text"]').fill('asdas1227.ru');
    await page.getByRole('button', { name: 'Начать работу бесплатно' }).click();
    await expect(page.locator('#top-menu')).toContainText('Новости');
  });

  test('test 4 Отображение форм Логина и Пароля на странице авторизации', async ({ page }) => {
    await page.goto('https://gymlog.ru/');
    await page.getByRole('link', { name: 'Вход' }).click();
    await expect(page.locator('#login-form')).toContainText('Логин или электронная почта *');
    await expect(page.locator('#login-form')).toContainText('Пароль *');
  });

  test('test 5 Отображение текста об ошибке при некорректной авторизации', async ({ page }) => {
    await page.goto('https://gymlog.ru/');
    await page.getByRole('link', { name: 'Вход' }).click();
    await page.getByRole('button', { name: 'Войти' }).click();
    await expect(page.locator('#login-form')).toContainText('Необходимо заполнить «Электронная почта».Необходимо заполнить «Пароль».');
  });

  test('test 6 Отображение текста на странице авторизованного пользователя', async ({ page }) => {
    await page.goto('https://gymlog.ru/');
    await page.getByRole('link', { name: 'Вход' }).click();
    await page.locator('#email').click();
    await page.locator('#email').fill('asdas1227@mail.ru');
    await page.getByLabel('Пароль *').click();
    await page.getByLabel('Пароль *').fill('aAKhL2');
    await page.getByRole('button', { name: 'Войти' }).click();
    await expect(page.locator('#top-menu')).toContainText('Контакты');
  });
