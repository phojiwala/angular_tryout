import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { CartService } from '../services/cart.service'

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css',
})
export class StoreComponent implements OnInit {
  products: any[] = []
  isLoading = false

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.isLoading = true
    this.getProducts()
      .then((data) => {
        this.products = data
        console.log(this.products)
      })
      .catch((error) => {
        console.error('Error fetching products:', error)
      })
      .finally(() => {
        this.isLoading = false
      })
  }

  addToCart(product: any) {
    const item = {
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    }
    this.cartService.addToCart(item)
  }

  async getProducts() {
    const response = await fetch(`https://fakestoreapi.com/products`)
    return await response.json()
  }
}
