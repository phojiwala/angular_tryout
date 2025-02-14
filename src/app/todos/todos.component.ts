import { Component } from '@angular/core'
import { FormComponent } from '../form/form.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormComponent, CommonModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent {
  selectedTodo: any = null
  todos: any[] = JSON.parse(localStorage.getItem('todos') || '[]')

  addUpdateTodo(newTodo: any) {
    const existingTodoIndex = this.todos.findIndex(
      (todo) => todo.id === newTodo.id
    )
    if (existingTodoIndex !== -1) {
      this.todos[existingTodoIndex] = newTodo
      this.selectedTodo = null
    } else {
      this.todos.push(newTodo)
    }
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  deleteTodo(id: any) {
    const index = this.todos.findIndex((todo) => todo.id === id)
    this.todos.splice(index, 1)
    localStorage.setItem('todos', JSON.stringify(this.todos))
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
