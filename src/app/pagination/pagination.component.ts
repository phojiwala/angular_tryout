import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core'; // Import Input
import { CommonModule } from '@angular/common';
import { UserService } from '../users/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit {
  @Input() currentOffset: number = 0;
  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];
  limit = 10;
  @Output() pageChanged = new EventEmitter<any>();

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.fetchTotalCount();
  }

  fetchTotalCount() {
    this.userService.getUsers('https://pokeapi.co/api/v2/pokemon?limit=1').subscribe((data: any) => {
      const totalCount = data.count;
      this.totalPages = Math.ceil(totalCount / this.limit);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.currentPage = Math.floor(this.currentOffset/this.limit) + 1;
      this.loadData(this.currentOffset);
    });
  }

  decrementPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      const offset = (this.currentPage - 1) * this.limit;
      this.loadData(offset);
      this.updateUrl(offset);
    }
  }

  incrementPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      const offset = (this.currentPage - 1) * this.limit;
      this.loadData(offset);
      this.updateUrl(offset);
    }
  }

  setPage(page: number) {
    this.currentPage = page;
    const offset = (page - 1) * this.limit;
    this.loadData(offset);
    this.updateUrl(offset);
  }

  private loadData(offset: number) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${this.limit}`;
    this.userService.getUsers(url).subscribe((data: any) => {
      this.pageChanged.emit({ data: data.results, offset });
    });
  }

  private updateUrl(offset: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { offset, limit: this.limit },
      queryParamsHandling: 'merge',
    });
  }
}