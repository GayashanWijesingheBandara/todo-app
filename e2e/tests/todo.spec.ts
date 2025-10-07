// e2e/tests/todo.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Todo App E2E Tests', () => {
  const baseURL = 'http://localhost:3000';

  test('Create, view, and complete a task', async ({ page }) => {
    // Go to frontend
    await page.goto(baseURL);

    // Fill out task form
    await page.fill('input[name="title"]', 'E2E Test Task');
    await page.fill('textarea[name="description"]', 'This is an end-to-end test task');

    // Submit the task
    await page.click('button[type="submit"]');

    // Verify task appears in list
    const taskCard = page.locator('text=E2E Test Task');
    await expect(taskCard).toBeVisible();
    await expect(taskCard.locator('text=This is an end-to-end test task')).toBeVisible();

    // Mark task as completed
    await taskCard.locator('button:has-text("Complete")').click();

    // Verify task is no longer visible (assuming completed tasks are hidden)
    await expect(taskCard).not.toBeVisible();

    // Optional: Verify task via API directly
    // await page.request.get('http://localhost:5000/api/tasks');
  });

  test('Health check endpoint works', async ({ request }) => {
    const response = await request.get('http://localhost:5000/api/health');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.status).toBe('ok');
    expect(body.database).toBe('connected');
  });
});
