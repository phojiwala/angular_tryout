import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PaginationComponent } from '../pagination/pagination.component'
import { UserService } from '../users/user.service'

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  pokemonList: any[] = []
  offset = 0
  limit = 10

  constructor(private userService: UserService) {}

  ngOnInit() {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${this.limit}`
    this.userService.getUsers(url).subscribe((data: any) => {
      this.pokemonList = data.results
    })
  }

  onPageChange(event: any) {
    this.pokemonList = event.data
    this.offset = event.offset
  }
}
