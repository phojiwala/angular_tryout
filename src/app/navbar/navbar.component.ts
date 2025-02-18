import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AsyncPipe, CommonModule } from '@angular/common'
import { navigationLinks } from '../app.routes'
import { CartService } from '../services/cart.service'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  links = navigationLinks
  cartItems$ = this.cartService.cartItems$

  constructor(private cartService: CartService) {}

  removeFromCart(itemId: number) {
    this.cartService.removeFromCart(itemId)
  }
}
