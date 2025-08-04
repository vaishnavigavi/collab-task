import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, AuthUser } from '@collab-task/shared-models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor() {
    // For demo purposes, create a mock user
    const mockUser: User = {
      id: 'demo-user-1',
      email: 'john.doe@example.com',
      displayName: 'John Doe',
      photoURL: 'https://ui-avatars.com/api/?name=John+Doe&background=4f46e5&color=fff',
      createdAt: new Date(),
      lastLoginAt: new Date()
    };
    this.userSubject.next(mockUser);
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  signIn(email: string, password: string): Promise<User> {
    // Mock sign in for demo
    return Promise.resolve(this.userSubject.value!);
  }

  signOut(): Promise<void> {
    this.userSubject.next(null);
    return Promise.resolve();
  }

  signUp(email: string, password: string, displayName: string): Promise<User> {
    // Mock sign up for demo
    const newUser: User = {
      id: 'demo-user-' + Date.now(),
      email,
      displayName,
      photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=4f46e5&color=fff`,
      createdAt: new Date(),
      lastLoginAt: new Date()
    };
    this.userSubject.next(newUser);
    return Promise.resolve(newUser);
  }
} 