import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  links = [
    {
      link: '/posts',
      label: 'Posts'
    },
    {
      link: '/users',
      label: 'Users'  
    },
    {
      link: '/chat',
      label: 'Chat'  
    }
  ];
}
