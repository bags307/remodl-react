import { createContext, useContext, useEffect, useState } from 'react';
import { 
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  User,
  browserPopupRedirectResolver,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useAppStore } from '@/store';
import { logError } from '@/lib/analytics';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, userData?: any) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setCurrentUser } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get additional user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();
          
          // Merge Firebase Auth user with Firestore data
          setCurrentUser({
            ...user,
            ...userData,
          });
        } catch (error) {
          logError(error as Error, { context: 'auth_state_change' });
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [setCurrentUser]);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      // For development, use demo login if Google auth fails
      try {
        const result = await signInWithPopup(auth, provider, browserPopupRedirectResolver);
        const { user } = result;

        // Check if user exists in Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (!userDoc.exists()) {
          // Create new user document if first time
          await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
            createdAt: new Date(),
            role: 'user',
          });
        }
      } catch (error) {
        console.warn('Google auth failed, using demo login:', error);
        await signInWithEmail('demo@example.com', 'demo123');
      }
    } catch (error: any) {
      logError(error, { context: 'google_sign_in' });
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      // Keep demo login for testing
      if (email === 'demo@example.com' && password === 'demo123') {
        const mockUser = {
          uid: 'demo-user',
          email: 'demo@example.com',
          displayName: 'Demo User',
          emailVerified: true,
          role: 'super_admin',
          metadata: {
            creationTime: new Date().toISOString(),
            lastSignInTime: new Date().toISOString(),
          },
          providerData: [],
          refreshToken: 'demo-token',
          tenantId: null,
          delete: () => Promise.resolve(),
          getIdToken: () => Promise.resolve('demo-token'),
          getIdTokenResult: () => Promise.resolve({
            token: 'demo-token',
            authTime: new Date().toISOString(),
            issuedAtTime: new Date().toISOString(),
            expirationTime: new Date(Date.now() + 3600000).toISOString(),
            signInProvider: 'password',
            claims: {
              role: 'super_admin'
            }
          }),
          reload: () => Promise.resolve(),
          toJSON: () => ({})
        };
        setCurrentUser(mockUser as User);
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      logError(error as Error, { context: 'email_sign_in' });
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string, userData?: any) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        name: userData?.name || email.split('@')[0],
        createdAt: new Date(),
        role: 'user',
        ...userData,
      });
    } catch (error) {
      logError(error as Error, { context: 'email_sign_up' });
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      logError(error as Error, { context: 'password_reset' });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      logError(error as Error, { context: 'logout' });
      throw error;
    }
  };

  const value = {
    currentUser: useAppStore(state => state.currentUser),
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    resetPassword,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};