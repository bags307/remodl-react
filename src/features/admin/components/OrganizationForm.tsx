import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Organization, OrganizationFormData } from '@/types/organization';

const organizationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  maxUserCount: z.number().min(1, 'Must allow at least 1 user'),
  domains: z.array(z.string().email('Invalid email domain')),
});

interface OrganizationFormProps {
  organization?: Organization;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: OrganizationFormData) => Promise<void>;
}

export function OrganizationForm({
  organization,
  open,
  onClose,
  onSubmit,
}: OrganizationFormProps) {
  const form = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: organization?.name || '',
      description: organization?.description || '',
      maxUserCount: organization?.maxUserCount || 5,
      domains: organization?.domains || [],
    },
  });

  const handleSubmit = async (data: OrganizationFormData) => {
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error('Error submitting organization:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {organization ? 'Edit Organization' : 'Create Organization'}
          </DialogTitle>
          <DialogDescription>
            {organization
              ? 'Update the organization details'
              : 'Add a new organization to the platform'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Organization name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Organization description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxUserCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Users</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Maximum number of users allowed in the organization
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {organization ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}