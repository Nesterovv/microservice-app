import { expect, Locator } from '@playwright/test';
import { LoginPage } from './login.page';

export class TodosPage extends LoginPage {
    private newTaskInput = 'input[placeholder="New task"]';
    private addTodoButton = 'button.btn.btn-primary:has-text("Add todo")';
    private createdTodoItem = 'li.list-group-item:has-text("asdasd")';
    private deleteTaskButton = 'li.list-group-item button.btn.btn-danger:has-text("X")';

    async addTodo(todoText: string): Promise<void> {
        await this.typeIntoField(this.newTaskInput, todoText);
        await this.clickElement(this.addTodoButton);
    }
    
    private getTodoItemLocator(todoText: string): Locator {
        return this.page.locator('li.list-group-item:not(.fade-leave-active):not(.fade-leave)').filter({
            has: this.page.locator('div.col-sm-11.text-left', { hasText: todoText }),
        });
    }
    
    async deleteTodo(todoText: string): Promise<void> {
        const todoItemLocator = this.getTodoItemLocator(todoText);
        await expect(todoItemLocator).toHaveCount(1);
        const deleteButton = todoItemLocator.locator('button.btn.btn-danger');
        await expect(deleteButton).toBeVisible();
        await expect(deleteButton).toBeEnabled();
        await deleteButton.click({ force: true });
        await expect(todoItemLocator).toHaveCount(0);
    }

    async isTodoPresent(todoText: string): Promise<boolean> {
        const todoItemLocator = this.getTodoItemLocator(todoText);
        return await todoItemLocator.isVisible();
    }
       
}
