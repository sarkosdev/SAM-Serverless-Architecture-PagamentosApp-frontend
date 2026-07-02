import { Injectable, signal } from '@angular/core';
import { fetchAuthSession, getCurrentUser, signInWithRedirect, signOut } from 'aws-amplify/auth';

export interface AuthUserView {
  username: string;
  userId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly isAuthenticated = signal(false);
  readonly currentUser = signal<AuthUserView | null>(null);

  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      const session = await fetchAuthSession();

      if (!session.tokens?.accessToken) {
        this.isAuthenticated.set(false);
        this.currentUser.set(null);
        return;
      }

      const user = await getCurrentUser();

      this.currentUser.set({
        username: user.username,
        userId: user.userId
      });

      this.isAuthenticated.set(true);
    } catch {
      this.isAuthenticated.set(false);
      this.currentUser.set(null);
    } finally {
      this.initialized = true;
    }
  }

  login(): Promise<void> {
    return signInWithRedirect();
  }

  async logout(): Promise<void> {
    await signOut();
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
  }

  async getAccessToken(): Promise<string | null> {
    const session = await fetchAuthSession();
    return session.tokens?.accessToken?.toString() ?? null;
  }
}