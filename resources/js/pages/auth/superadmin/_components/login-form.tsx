import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react';

export function LoginForm({
    type = "super admin"
}: {
        type: string;
    }) {

    const formLogin = useForm("post", '/superadmin/login', {
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        formLogin.submit({
            onSuccess: () => {
                console.log('Login successful');
                router.reload();
            },
            onPrecognitionSuccess: () => {
                console.log('Precognition success, no validation errors');
            },
            onValidationError: () => {
                console.log('Validation errors occurred');
            }
        });
    }


    return (
        <form onSubmit={handleSubmit} className={cn('flex flex-col gap-6', '')}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login as {type}</h1>
                <p className="text-sm text-balance text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        onChange={(e) => formLogin.setData('email', e.target.value)}
                        value={formLogin.data.email}
                        onBlur={() => formLogin.validate('email')}
                        placeholder="email@example.com"
                        required
                    />
                    {formLogin.invalid('email') && (
                        <p className="mt-1 text-sm text-red-600">{formLogin.errors.email}</p>
                    )}
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        {/* <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a> */}
                    </div>
                    <Input
                        id="password"
                        type="password"
                        onChange={(e) => formLogin.setData('password', e.target.value)}
                        onBlur={() => formLogin.validate('password')}
                        placeholder="********"
                        required
                    />
                    {formLogin.invalid('password') && (
                        <p className="mt-1 text-sm text-red-600">{formLogin.errors.password}</p>
                    )}
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
            </div>
            {type !== 'super admin' && (
                <div className="text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <a href="#" className="underline underline-offset-4">
                        Sign up
                    </a>
                </div>
            )}
        </form>
    );
}
