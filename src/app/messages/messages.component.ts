import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messages = [
    { text: 'Hello! How can I help you today?', isUser: false },
    { text: 'I need help with Angular forms', isUser: true },
    { text: 'Sure! What specific aspect of Angular forms do you need help with?', isUser: false }
  ];
}
