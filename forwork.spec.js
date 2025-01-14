import { test, expect } from '@playwright/test';

// Тест 1: Проверка отображения текста на форме регистрации
// Проверяем, что на странице регистрации отображается правильное сообщение о создании аккаунта.
test('test 1 Отображение надписи на форме регистрации', async ({ page }) => {
    test.setTimeout(90000);
    await page.goto('https://gymlog.ru/');
    await page.getByRole('link', { name: 'Регистрация' }).click(); // Переходим на страницу регистрации
    await page.getByRole('button', { name: 'Начать работу бесплатно' }).click(); // Нажимаем на кнопку регистрации
    await expect(page.locator('#registration')).toContainText('Создайте аккаунт и получите качественный дневник тренировок!'); // Проверяем наличие нужного текста
});

// Тест 2: Проверка текста ошибки при некорректной регистрации
// Проверяем, что при попытке регистрации с пустыми полями выводится сообщение об ошибке.
test('test 2 Отображение текста об ошибке при некорректной регистрации', async ({ page }) => {
    test.setTimeout(90000);
    await page.goto('https://gymlog.ru/');
    await page.getByRole('link', { name: 'Регистрация' }).dblclick(); // Переходим на страницу регистрации
    await page.getByRole('button', { name: 'Начать работу бесплатно' }).click(); // Нажимаем на кнопку регистрации без ввода данных
    await expect(page.locator('#registration-form')).toContainText('Необходимо заполнить «Электронная почта».'); // Проверяем, что выводится ошибка для пустого поля email
});

// Тест 3: Проверка отображения текста на странице зарегистрированного пользователя
// Проверяем, что после успешной регистрации пользователь видит нужный текст на главной странице.
test('test 3 Отображение текста на странице зарегистрированного пользователя', async ({ page }) => {
    await page.goto('https://gymlog.ru/');
    await page.getByRole('link', { name: 'Регистрация' }).click(); // Переходим на страницу регистрации
    await page.locator('input[type="text"]').click(); // Кликаем в поле email
    await page.locator('input[type="text"]').fill('asdas1227.ru'); // Вводим некорректный email
    await page.getByRole('button', { name: 'Начать работу бесплатно' }).click(); // Нажимаем на кнопку регистрации
    await expect(page.locator('#top-menu')).toContainText('Новости'); // Проверяем, что отображается текст "Новости" для зарегистрированного пользователя
});

// Тест 4: Проверка отображения полей для ввода Логина и Пароля на странице авторизации
// Проверяем, что на странице авторизации отображаются нужные поля для ввода логина и пароля.
test('test 4 Отображение форм Логина и Пароля на странице авторизации', async ({ page }) => {
    await page.goto('https://gymlog.ru/');
    await page.getByRole('link', { name: 'Вход' }).click(); // Переходим на страницу авторизации
    await expect(page.locator('#login-form')).toContainText('Логин или электронная почта *'); // Проверяем текст поля Логин
    await expect(page.locator('#login-form')).toContainText('Пароль *'); // Проверяем текст поля Пароль
});

// Тест 5: Проверка текста ошибки при некорректной авторизации
// Проверяем, что при попытке авторизации с пустыми полями выводится сообщение об ошибке.
test('test 5 Отображение текста об ошибке при некорректной авторизации', async ({ page }) => {
    await page.goto('https://gymlog.ru/');
    await page.getByRole('link', { name: 'Вход' }).click(); // Переходим на страницу авторизации
    await page.getByRole('button', { name: 'Войти' }).click(); // Нажимаем на кнопку входа с пустыми полями
    await expect(page.locator('#login-form')).toContainText('Необходимо заполнить «Электронная почта».Необходимо заполнить «Пароль».'); // Проверяем сообщение об ошибке
});

// Тест 6: Проверка отображения текста на странице авторизованного пользователя
// Проверяем, что после успешной авторизации на странице отображается текст с контентом для авторизованного пользователя.
test('test 6 Отображение текста на странице авторизованного пользователя', async ({ page }) => {
    await page.goto('https://gymlog.ru/');
    await page.getByRole('link', { name: 'Вход' }).click(); // Переходим на страницу авторизации
    await page.locator('#email').click(); // Кликаем в поле email
    await page.locator('#email').fill('asdas1227@mail.ru'); // Вводим email
    await page.getByLabel('Пароль *').click(); // Кликаем в поле пароля
    await page.getByLabel('Пароль *').fill('aAKhL2'); // Вводим пароль
    await page.getByRole('button', { name: 'Войти' }).click(); // Нажимаем на кнопку входа
    await expect(page.locator('#top-menu')).toContainText('Контакты'); // Проверяем, что отображается текст "Контакты" после авторизации
});
