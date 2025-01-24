import { Component, ViewChild, TemplateRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent, AccordionItem } from '../accordion/accordion.component';
import { MessagesComponent } from '../messages/messages.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, AccordionComponent, MessagesComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewInit {
  @ViewChild('promptsContent') promptsContent!: TemplateRef<any>;
  @ViewChild('recentChatsContent') recentChatsContent!: TemplateRef<any>;

  accordionItems: AccordionItem[] = [];

  models = [
    { name: 'ChatGPT', value: 'ChatGPT' },
    { name: 'Claude', value: 'Claude' },
    { name: 'Gemini', value: 'Gemini' },
  ];

  chats: AccordionItem[] = [
    {
      title: 'Prompts',
      isOpen: true
    },
    {
      title: 'Recent Chats',
      isOpen: false
    }
  ];

  prompts = [
    { name: 'Default Prompt', text: 'You are a helpful assistant.' },
    { name: 'Custom Prompt 1', text: 'You are a coding expert.' }
  ];

  recentChats = [
    { id: 1, name: 'Chat #1', lastMessage: 'Hello there!' },
    { id: 2, name: 'Chat #2', lastMessage: 'How can I help?' }
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Update the items
    this.accordionItems = [
      { ...this.chats[0], template: this.promptsContent },
      { ...this.chats[1], template: this.recentChatsContent }
    ];
    
    // Tell Angular to check for changes
    this.cdr.detectChanges();
  }

  selectPrompt(prompt: { name: string, text: string }) {
    console.log('Selected prompt:', prompt);
    // Add your prompt selection logic here
  }

  openChat(chat: { id: number, name: string, lastMessage: string }) {
    console.log('Opening chat:', chat);
    // Add your chat opening logic here
  }
}
