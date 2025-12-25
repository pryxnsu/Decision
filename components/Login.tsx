import Link from 'next/link';
import GoogleIcon from './icons/GoogleIcon';
import { Button } from './ui/button';
import { signIn } from 'next-auth/react';

export default function Login() {
    return (
        <div className="bg-background flex min-h-screen w-full items-center justify-center p-8">
            <div className="w-full max-w-md border-black bg-white p-8">
                <div className="mb-8 border-b-4 border-black pb-6 dark:border-white">
                    <h1 className="text-4xl font-black tracking-tighter uppercase md:text-5xl">
                        DECISION<span className="text-accent">.</span>
                    </h1>
                    <p className="mt-2 text-xs font-bold tracking-widest uppercase opacity-50">LOGIN TO CONTINUE</p>
                </div>

                <div className="space-y-6">
                    <p className="text-sm leading-relaxed font-medium">
                        Join the community. Help others make decisions. Get help with yours.
                    </p>

                    <Button
                        variant="outline"
                        onClick={() => signIn('google', { callbackUrl: '/feed' })}
                        className="group shadow-hard hover:shadow-hard-hover flex w-full items-center justify-center gap-3 border-2 border-black bg-white px-6 py-4 text-black transition-all hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_#000] dark:border-white dark:bg-zinc-800 dark:text-white dark:shadow-[4px_4px_0px_0px_#fff]"
                    >
                        <GoogleIcon />
                        <span className="font-black tracking-tight uppercase">Continue with Google</span>
                    </Button>

                    <div className="flex items-center gap-4">
                        <div className="h-1 flex-1 bg-black dark:bg-white" />
                        <span className="text-xs font-black uppercase">OR</span>
                        <div className="h-1 flex-1 bg-black dark:bg-white" />
                    </div>

                    <Link
                        href="/feed"
                        className="bg-accent shadow-hard hover:shadow-hard-hover block w-full border-2 border-black px-6 py-4 text-center font-black tracking-tight text-white uppercase transition-all hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0"
                    >
                        Browse as Guest →
                    </Link>
                </div>

                <div className="mt-8 border-t-2 border-black pt-6 dark:border-white">
                    <p className="text-center text-[10px] leading-relaxed font-bold tracking-wide uppercase opacity-70">
                        By clicking continue, you agree to our{' '}
                        <Link href="/legal/terms-of-services" className="hover:text-accent underline">
                            Terms
                        </Link>{' '}
                        and{' '}
                        <Link href="/legal/privacy-policy" className="hover:text-accent underline">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
