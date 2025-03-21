import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionComponent, AccordionItem } from '../accordion/accordion.component';
import { FormComponent } from '../form/form.component';
import { MessagesComponent } from '../messages/messages.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AccordionComponent,
    MessagesComponent,
    FormComponent
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @ViewChild('promptsContent') promptsContent!: TemplateRef<any>;
  @ViewChild('recentChatsContent') recentChatsContent!: TemplateRef<any>;

  accordionItems: AccordionItem[] = [];

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

  models = [
    { name: 'ChatGPT', value: 'ChatGPT' },
    { name: 'Claude', value: 'Claude' },
    { name: 'Gemini', value: 'Gemini' },
  ];

  searchQuery: string = '';
  selectedModel: string = '';

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.accordionItems = [
      { ...this.chats[0], template: this.promptsContent },
      { ...this.chats[1], template: this.recentChatsContent }
    ];
    this.cdr.detectChanges();
  }

  selectPrompt(prompt: { name: string, text: string }) {
    console.log('Selected prompt:', prompt);
  }

  openChat(chat: { id: number, name: string, lastMessage: string }) {
    console.log('Opening chat:', chat);
  }

  handleSearch() {
    console.log('Search Query:', this.searchQuery);
    console.log('Selected Model:', this.selectedModel);
  }
}
