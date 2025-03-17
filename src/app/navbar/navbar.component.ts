import { Component } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { AsyncPipe, CommonModule } from '@angular/common'
import { navigationLinks } from '../app.routes'
import { CartService } from '../services/cart.service'
import { AuthService } from '../services/auth.service'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  links = navigationLinks;
  cartItems$ = this.cartService.cartItems$;
  isAdmin$ = this.authService.currentUser$.pipe(
    map(user => user?.role === 'admin')
  );

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}
     
  removeFromCart(itemId: number) {
    this.cartService.removeFromCart(itemId)
  }

  logout(): void {
    this.authService.logout()
    this.showToast('Logged out successfully!')
    this.router.navigate(['/login'])
  }

  private showToast(message: string): void {
    const toast = document.createElement('div')
    toast.innerHTML = `
      <div class="toast">
        <div class="alert alert-info">
          <span>${message}</span>
        </div>
      </div>
    `
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 3000)
  }
}
