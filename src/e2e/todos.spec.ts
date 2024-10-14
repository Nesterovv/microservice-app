import { test as playwrightTest, expect } from "@playwright/test";
import { TodosPage } from "../pages/todos.page";
import { tasks } from "../test-data/testData";
import * as dotenv from "dotenv";

dotenv.config();

const test = playwrightTest.extend<{
  createdTodos: string[];
}>({
  createdTodos: [
    async ({}, use) => {
      await use([]);
    },
    { scope: "worker" },
  ],
});

test.describe("Todos E2E Tests", () => {
  let todosPage: TodosPage;
  const baseUrl = process.env.BASE_URL!;
  const username = process.env.USERNAME!;
  const password = process.env.PASSWORD!;
  const todoText = tasks.validTask.title;

  test.beforeEach(async ({ page }) => {
    todosPage = new TodosPage(page);

    await todosPage.navigateTo(baseUrl + "#/login");
    await todosPage.login(username, password);
  });

  test("User can add a new todo item", async ({ createdTodos }, testInfo) => {
    const addTodoUniqueText = `${todoText} - ${testInfo.project.name}`;
    await todosPage.addTodo(addTodoUniqueText);
    createdTodos.push(addTodoUniqueText);
    const isPresent = await todosPage.isTodoPresent(addTodoUniqueText);
    expect(isPresent).toBe(true);
  });

  test("User can delete a todo item", async ({ createdTodos }, testInfo) => {
    const addTodoUniqueText = `${todoText} - delete - ${
      testInfo.project.name
    } - ${Date.now()}`;
    await todosPage.addTodo(addTodoUniqueText);
    createdTodos.push(addTodoUniqueText);

    let isPresent = await todosPage.isTodoPresent(addTodoUniqueText);
    expect(isPresent).toBe(true);

    await todosPage.deleteTodo(addTodoUniqueText);

    isPresent = await todosPage.isTodoPresent(addTodoUniqueText);
    expect(isPresent).toBe(false);
  });

  test.afterAll(async ({ browser, createdTodos }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const todosPage = new TodosPage(page);
    await todosPage.navigateTo(baseUrl + "#/login");
    await todosPage.login(username, password);

    for (const todo of createdTodos) {
      const isPresent = await todosPage.isTodoPresent(todo);
      if (isPresent) {
        await todosPage.deleteTodo(todo);
      }
    }

    await context.close();
  });
});
