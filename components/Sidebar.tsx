'use client';

import { cn } from '@/lib/utils';
import { Rss, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useScreen } from '@/hooks/useScreen';

const MENU_ITEMS = [
    { icon: Rss, label: 'Feed', href: '/feed' },
    { icon: User, label: 'Me', href: '/me' },
];

export default function Sidebar() {
    const { screenView } = useScreen();
    const { status } = useSession();

    return screenView === 'desktop' ? (
        <div className="sticky top-0 h-screen w-62 border-r-2 border-zinc-900 bg-white lg:w-72 dark:border-white dark:bg-zinc-900">
            <div className="hidden h-24 items-center border-b-2 border-zinc-900 px-8 md:flex dark:border-white">
                <div className="relative">
                    <h2 className="text-2xl font-black tracking-tighter text-zinc-900 uppercase italic dark:text-white">
                        Decision<span className="text-accent">_</span>
                    </h2>
                </div>
            </div>

            <SidebarItem />

            <div className="absolute right-0 bottom-0 left-0 hidden border-t-2 border-zinc-900 bg-zinc-50 px-8 py-5 md:flex dark:border-white dark:bg-zinc-800">
                <div className="flex w-full items-center justify-between font-black tracking-tight uppercase">
                    <span className="text-[11px] text-zinc-900 dark:text-zinc-100">Status:</span>
                    <span className="text-accent text-[10px]">
                        {status === 'authenticated' ? (
                            <span className="text-accent">{status}</span>
                        ) : (
                            <Link href="/login" className="text-accent">
                                {status}
                            </Link>
                        )}
                    </span>
                </div>
            </div>
        </div>
    ) : (
        <div className="fixed bottom-0 left-0 z-999 w-full border-t">
            <SidebarItem />
        </div>
    );
}

const SidebarItem = () => {
    const pathname = usePathname();
    return (
        <nav className="bg-background flex w-full flex-row space-y-0 md:flex-col">
            {MENU_ITEMS.map(item => {
                const isActive = pathname.includes(item.href);
                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                            'group relative flex h-16 w-full items-center border-b border-zinc-900/10 px-8 transition-all dark:border-white/10',
                            isActive
                                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                                : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                        )}
                    >
                        <div className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-4">
                                <item.icon className={cn('h-4 w-4', isActive ? 'text-accent' : 'text-zinc-400')} />
                                <span className="text-xs font-black tracking-[0.2em] uppercase">{item.label}</span>
                            </div>
                        </div>

                        <div className="bg-accent absolute bottom-0 left-0 h-0 w-1 transition-all duration-300 group-hover:h-full" />
                    </Link>
                );
            })}
        </nav>
    );
};
