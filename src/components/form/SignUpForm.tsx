import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation } from 'wouter';
import { useAuthStore } from '@/stores/useAuthStore';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SignupFormData, signupSchema } from '@/config/zod-schemas/signupSchema';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertDestructive } from '@/components/alert/AlertDestructive';
import { useState } from 'react';

export const SignUpForm = () => {
  const { signup } = useAuthStore();
  const [, navigate] = useLocation();
  const [error, setError] = useState<string | null | undefined>(null);

  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  });

  const handleSignUp = async (formData: SignupFormData): Promise<void> => {
    const response = await signup(formData);
    if (response.success) {
      console.log('Signup successful');
      navigate('/');
    } else {
      console.error('Signup failed:', response.error);
      setError(response.error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSignUp)} className="space-y-2">
        <div className="grid gap-4 py-4">
          <Controller
            name="firstName"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col space-y-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input {...field} id="firstName" type="text" placeholder="Enter your first name" />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">{fieldState.error.message}</span>
                )}
              </div>
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col space-y-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input {...field} id="lastName" type="text" placeholder="Enter your last name" />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">{fieldState.error.message}</span>
                )}
              </div>
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input {...field} id="email" type="email" placeholder="Enter your email" />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">{fieldState.error.message}</span>
                )}
              </div>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input {...field} id="password" type="password" placeholder="Enter your password" />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">{fieldState.error.message}</span>
                )}
              </div>
            )}
          />
        </div>
        <Checkbox id="terms" />
        <Label className="text-sm p2 " htmlFor="terms">
          I agree to the{' '}
          <Link
            className="underline underline-offset-2 hover:text-gray-900 dark:hover:text-gray-50"
            href="#"
          >
            terms of service
          </Link>
        </Label>
        <Button className="w-full" type="submit" disabled={!isValid}>
          Sign Up
        </Button>
        {error && <AlertDestructive errorMessage={error} />}
      </form>
    </>
  );
};