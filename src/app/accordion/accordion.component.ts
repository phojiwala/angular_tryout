import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AccordionItem {
  title: string;
  content?: string;
  template?: TemplateRef<any>;
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
  @Input() name: string = 'accordion';
  @Input() bgColor: string = 'bg-base-200';
}
