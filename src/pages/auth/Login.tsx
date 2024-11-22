import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoogleLogo } from '@/components/icons/GoogleLogo';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Quote, KeyRound } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function Login() {
  const { signInWithEmail, signInWithGoogle, signInWithSSO } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      await signInWithEmail(data.email, data.password);
      navigate('/');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Invalid email or password',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      navigate('/');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to sign in with Google',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithEmail('demo@example.com', 'demo123');
      navigate('/');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to sign in with demo account',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row" data-name="login-page">
      <div className="relative w-full lg:w-[35%]" data-name="login-form-container">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')] bg-cover bg-center">
          <div className="absolute inset-0 bg-navy/90" />
        </div>

        <div className="relative min-h-[100dvh] lg:min-h-screen flex items-center justify-center" data-name="login-form-wrapper">
          <div className="w-full max-w-sm mx-auto p-6" data-name="login-content">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-8" data-name="login-header">
              <img 
                src="https://storage.googleapis.com/flutterflow-io-6f20.appspot.com/projects/demo-o82y47/assets/62eqtqyau5qj/remodL-dark2.png"
                alt="Remodl"
                className="h-8"
              />
            </div>

            <div className="mb-8 text-center lg:text-left" data-name="login-title">
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
                Welcome to Remodl
              </h1>
              <p className="text-white/60">Sign in to your account</p>
            </div>

            <div className="space-y-6" data-name="login-form">
              <Button
                variant="outline"
                className="w-full bg-white text-navy hover:bg-white/90"
                onClick={handleDemoLogin}
                disabled={isLoading}
                data-name="demo-login-button"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Demo Login'
                )}
              </Button>

              <div className="relative" data-name="login-divider">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-navy/90 px-2 text-white/60">Or</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3" data-name="social-login-buttons">
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  data-name="google-login-button"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <GoogleLogo />
                      <span className="ml-2">Google</span>
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => {}}
                  disabled={isLoading}
                  data-name="sso-login-button"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <KeyRound className="h-4 w-4" />
                      <span className="ml-2">SSO</span>
                    </>
                  )}
                </Button>
              </div>

              <div className="relative" data-name="email-login-divider">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-navy/90 px-2 text-white/60">
                    Or continue with email
                  </span>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-name="email-login-form">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="name@example.com"
                            type="email"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                            {...field}
                            data-name="email-input"
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-white">Password</FormLabel>
                          <Link
                            to="/auth/reset-password"
                            className="text-sm text-white/60 hover:text-white"
                            data-name="forgot-password-link"
                          >
                            Forgot Password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="Enter your password"
                            type="password"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                            {...field}
                            data-name="password-input"
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-white text-navy hover:bg-white/90"
                    disabled={isLoading}
                    data-name="submit-button"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            <div className="text-sm text-center mt-6" data-name="signup-link">
              <span className="text-white/60">Don't have an account?</span>{' '}
              <Link to="/auth/register" className="text-white hover:underline">
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-background p-8 items-center justify-center" data-name="testimonial-section">
        <div className="max-w-lg">
          <div className="mb-8">
            <Quote className="h-12 w-12 text-navy opacity-50" />
          </div>
          <blockquote className="space-y-4">
            <p className="text-2xl font-light text-foreground">
              "Remodl has transformed how we manage our renovation projects. The platform's 
              intelligent automation and seamless collaboration tools have increased our 
              efficiency by 60%."
            </p>
            <footer className="mt-4">
              <div className="font-semibold">Sarah Chen</div>
              <div className="text-muted-foreground text-sm">
                Director of Operations, Urban Living Spaces
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}