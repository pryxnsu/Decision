'use client';

import Sidebar from '@/components/Sidebar';
import { SessionProvider } from 'next-auth/react';

export default function FeedLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <div className="bg-background relative flex min-h-screen">
                <Sidebar />
                <main className="mb-10 flex-1 overflow-y-auto">{children}</main>
            </div>
        </SessionProvider>
    );
}
