import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  username: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private storage: Storage;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.storage = document.defaultView?.localStorage!;
    const savedUser = this.storage?.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(username: string, password: string): boolean {
    let user: User | null = null;

    if (username === 'admin' && password === 'admin') {
      user = { username: 'admin', role: 'admin' };
    } else if (username === 'user' && password === 'user') {
      user = { username: 'user', role: 'user' };
    }

    if (user) {
      this.storage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return true;
    }
    return false;
  }

  logout(): void {
    this.storage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}