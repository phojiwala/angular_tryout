import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: `
    <span class="text-error text-xs" *ngIf="showError">
      {{ errorMessage }}
    </span>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class ErrorMessageComponent {
  @Input() control: any;
  @Input() controlName: string = '';

  get showError(): boolean {
    return this.control?.touched && this.control?.invalid;
  }

  get errorMessage(): string {
    if (this.control?.hasError('required')) {
      return `${this.controlName} is required`;
    }
    if (this.control?.hasError('minlength')) {
      return `${this.controlName} must be at least ${this.control.errors?.['minlength'].requiredLength} characters`;
    }
    if (this.control?.hasError('pastDate')) {
      return 'Date cannot be in the past';
    }
    if (this.control?.hasError('noVehicle')) {
      return 'Please select at least one vehicle';
    }
    return '';
  }
}