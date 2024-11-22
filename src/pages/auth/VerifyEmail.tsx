import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Loader2 } from 'lucide-react';

export function VerifyEmail() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    async function verifyEmail() {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        
        if (!email) {
          setError('Email not found. Please try signing in again.');
          setIsVerifying(false);
          return;
        }

        try {
          await signInWithEmailLink(auth, email, window.location.href);
          window.localStorage.removeItem('emailForSignIn');
          navigate('/');
        } catch (error) {
          setError('Failed to verify email. Please try again.');
          setIsVerifying(false);
        }
      } else {
        setError('Invalid verification link.');
        setIsVerifying(false);
      }
    }

    verifyEmail();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Building2 className="h-12 w-12" />
          <h1 className="text-2xl font-bold">Email Verification</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {isVerifying ? 'Verifying your email...' : error ? 'Verification Failed' : 'Verified!'}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            {isVerifying ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : error ? (
              <>
                <p className="text-destructive">{error}</p>
                <Button onClick={() => navigate('/auth/login')}>
                  Return to Sign In
                </Button>
              </>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}