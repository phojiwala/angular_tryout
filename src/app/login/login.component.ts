import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="hero min-h-screen bg-gray-300">
      <div class="hero-content flex-col">
        <div class="card w-96 bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Login</h2>
            <h6>admin or user</h6>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Username</span>
              </label>
              <input type="text" [(ngModel)]="username" class="input input-bordered" />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input type="password" [(ngModel)]="password" class="input input-bordered" />
            </div>
            <div class="card-actions justify-end mt-4">
              <button class="btn btn-primary" (click)="onLogin()">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    if (this.authService.login(this.username, this.password)) {
      this.showToast('Login successful!');
      this.router.navigate(['/posts']);
    } else {
      this.showToast('Invalid credentials!');
    }
  }

  private showToast(message: string): void {
    const toast = document.createElement('div');
    toast.innerHTML = `
      <div class="toast">
        <div class="alert alert-info">
          <span>${message}</span>
        </div>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }
}