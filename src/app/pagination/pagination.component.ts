import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="join">
      <button class="join-item btn" [disabled]="currentOffset === 0" (click)="previousPage()">«</button>
      <button class="join-item btn">Page {{currentPage}}</button>
      <button class="join-item btn" (click)="nextPage()">»</button>
    </div>
  `
})
export class PaginationComponent {
  @Input() currentOffset = 0;
  @Output() pageChange = new EventEmitter<any>();
  currentPage = 1;
  limit = 10;

  nextPage() {
    this.currentOffset += this.limit;
    this.currentPage++;
    this.pageChange.emit({
      offset: this.currentOffset,
      page: this.currentPage
    });
  }

  previousPage() {
    if (this.currentOffset > 0) {
      this.currentOffset -= this.limit;
      this.currentPage--;
      this.pageChange.emit({
        offset: this.currentOffset,
        page: this.currentPage
      });
    }
  }
}