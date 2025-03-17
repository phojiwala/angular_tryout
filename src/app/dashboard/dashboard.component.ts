import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl mb-4">Welcome {{ username }}</h1>
      <button class="btn btn-primary" (click)="logout()">Logout</button>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  username: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.username = user?.username || '';
    });
  }

  logout(): void {
    this.authService.logout();
    this.showToast('Logged out successfully!');
    this.router.navigate(['/login']);
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