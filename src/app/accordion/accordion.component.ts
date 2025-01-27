import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AccordionItem {
  title: string;
  content?: string;
  template?: any;
  isOpen?: boolean;
}

@Component({
  selector: 'accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent {
  @Input() items: AccordionItem[] = [];
  @Input() name: string = '';
  @Input() bgColor: string = '';
}
