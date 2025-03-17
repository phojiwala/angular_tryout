import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { IndianCurrencyPipe } from '../shared/pipes/indian-currency.pipe';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormComponent, CommonModule, IndianCurrencyPipe],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent {
  selectedTodo: any = null;
  todos: any[] = [];
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.todos = this.isBrowser ? JSON.parse(localStorage.getItem('todos') || '[]') : [];
  }

  addUpdateTodo(newTodo: any) {
    const existingTodoIndex = this.todos.findIndex(
      (todo) => todo.id === newTodo.id
    );
    if (existingTodoIndex !== -1) {
      this.todos[existingTodoIndex] = newTodo;
      this.selectedTodo = null;
    } else {
      this.todos.push(newTodo);
    }
    if (this.isBrowser) {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  deleteTodo(id: any) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    this.todos.splice(index, 1);
    if (this.isBrowser) {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  editData(id: any) {
    const todoToEdit = this.todos.find((todo) => todo.id === id)
    if (todoToEdit) {
      this.selectedTodo = todoToEdit
    }
  }

  getTrueKeys(obj: any): string[] {
    return Object.keys(obj.vehicles).filter((key) => obj.vehicles[key] === true)
  }
}
