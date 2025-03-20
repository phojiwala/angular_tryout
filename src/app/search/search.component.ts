import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  search = new FormControl('')
  searchResults: any[] = []
  isLoading = false

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string | null) => {
          this.isLoading = true
          return this.apiCall(term || 'plants')
        })
      )
      .subscribe((results) => {
        this.searchResults = results.data.items
        this.isLoading = false
      })
  }

  async apiCall(term: string) {
    const response = await fetch(
      `https://demo.dataverse.org/api/search?q=${term}`
    )
    return await response.json()
  }
}
