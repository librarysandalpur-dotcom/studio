import { createContext, useContext, ReactNode } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

const FirebaseAppContext = createContext<FirebaseApp | undefined>(undefined);
const FirebaseAuthContext = createContext<Auth | undefined>(undefined);
const FirebaseFirestoreContext = createContext<Firestore | undefined>(undefined);

type FirebaseProviderProps = {
  children: ReactNode;
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
};

export function FirebaseProvider({ children, app, auth, firestore }: FirebaseProviderProps) {
  return (
    <FirebaseAppContext.Provider value={app}>
      <FirebaseAuthContext.Provider value={auth}>
        <FirebaseFirestoreContext.Provider value={firestore}>
          {children}
        </FirebaseFirestoreContext.Provider>
      </FirebaseAuthContext.Provider>
    </FirebaseAppContext.Provider>
  );
}

export const useFirebaseApp = () => {
  const app = useContext(FirebaseAppContext);
  if (app === undefined) {
    throw new Error('useFirebaseApp must be used within a FirebaseProvider');
  }
  return app;
};

export const useAuth = () => {
  const auth = useContext(FirebaseAuthContext);
  if (auth === undefined) {
    throw new Error('useAuth must be used within a FirebaseProvider');
  }
  return auth;
};

export const useFirestore = () => {
  const firestore = useContext(FirebaseFirestoreContext);
  if (firestore === undefined) {
    throw new Error('useFirestore must be used within a FirebaseProvider');
  }
  return firestore;
};
