import { LoginForm } from './_components/login-form';


export default function LoginPage() {
    const randomNumberOneToFour = Math.floor(Math.random() * 4) + 1;

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="flex size-6  items-center justify-center rounded-md ">
                            <img src="/assets/images/logo-pcs.png" alt="Logo" className="h-6 w-6" />
                        </div>
                        SISTEM INVENTARIS PCS
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm type='super admin'/>
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src={`/assets/images/petrokopindo-bg-${randomNumberOneToFour}.jpg`}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}
