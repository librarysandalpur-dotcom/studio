'use client';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useFirebaseApp } from '@/firebase/provider';

// This is a placeholder for the actual token cookie name used by Firebase Auth.
// In a real app, you would need a robust way to manage session cookies, possibly with a server-side component.
const FIREBASE_AUTH_TOKEN_COOKIE = 'firebase-auth-token';


export function useUser() {
  const app = useFirebaseApp();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      // Basic cookie management for middleware detection.
      // NOTE: This is a simplified client-side approach. For production,
      // you should handle session cookies securely (e.g., httpOnly, secure, server-side).
      if (user) {
        // Set a simple cookie to indicate an active session.
        document.cookie = `${FIREBASE_AUTH_TOKEN_COOKIE}=true; path=/; max-age=3600`; // Expires in 1 hour
      } else {
        // Clear the cookie on logout.
        document.cookie = `${FIREBASE_AUTH_TOKEN_COOKIE}=; path=/; max-age=0`;
      }
    });

    return () => unsubscribe();
  }, [app]);

  return { user, loading };
}
