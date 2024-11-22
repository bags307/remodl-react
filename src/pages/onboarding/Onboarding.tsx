import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { useOrganization } from '@/contexts/OrganizationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import {
  Building2,
  Building,
  Users,
  Briefcase,
  ArrowRight,
  Loader2,
} from 'lucide-react';

const onboardingSchema = z.object({
  organizationName: z.string().min(2, 'Organization name is required'),
  organizationType: z.enum(['investor', 'contractor', 'property_manager']),
  fullName: z.string().min(2, 'Full name is required'),
  jobTitle: z.string().min(2, 'Job title is required'),
});

type OnboardingForm = z.infer<typeof onboardingSchema>;

export function Onboarding() {
  const { currentUser } = useAuth();
  const { setCurrentOrg } = useOrganization();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<OnboardingForm>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      organizationName: '',
      organizationType: 'investor',
      fullName: '',
      jobTitle: '',
    },
  });

  const onSubmit = async (data: OnboardingForm) => {
    if (!currentUser) return;

    try {
      setIsLoading(true);

      // Store the user's first name in localStorage
      const firstName = data.fullName.split(' ')[0];
      localStorage.setItem('userName', firstName);

      // Create organization document
      const orgRef = doc(db, 'organizations', crypto.randomUUID());
      const organization = {
        id: orgRef.id,
        name: data.organizationName,
        type: data.organizationType,
        createdAt: new Date(),
        createdBy: currentUser.uid,
        users: [{
          id: currentUser.uid,
          email: currentUser.email,
          name: data.fullName,
          role: 'admin',
          jobTitle: data.jobTitle,
        }],
      };

      await setDoc(orgRef, organization);
      setCurrentOrg(organization);

      // Update user profile
      await setDoc(doc(db, 'users', currentUser.uid), {
        email: currentUser.email,
        name: data.fullName,
        jobTitle: data.jobTitle,
        organizationId: orgRef.id,
        role: 'admin',
        createdAt: new Date(),
      });

      toast({
        title: 'Welcome to Remodl!',
        description: 'Your organization has been created successfully.',
      });

      navigate('/');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create organization',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-xl space-y-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Building2 className="h-12 w-12" />
          <h1 className="text-2xl font-bold">Welcome to Remodl</h1>
          <p className="text-muted-foreground">
            Let's set up your organization
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Organization Setup</CardTitle>
            <CardDescription>
              Tell us about your organization and role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="organizationName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Name</FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Enter organization name" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organizationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select organization type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="investor">Real Estate Investor</SelectItem>
                            <SelectItem value="contractor">General Contractor</SelectItem>
                            <SelectItem value="property_manager">Property Manager</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Full Name</FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Enter your full name" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Enter your job title" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}