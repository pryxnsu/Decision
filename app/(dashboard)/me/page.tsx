'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FeedCard } from '@/components/FeedCard';
import { User } from 'lucide-react';
import Loader from '@/components/Loader';
import Link from 'next/link';

interface QuestionProp {
    id: string;
    question: string;
    description: string;
    username: string;
    createdAt: string;
    questionType: string;
    responses: number;
}

export default function Page() {
    const { data: session, status } = useSession();
    const [userQuestions, setUserQuestions] = useState<QuestionProp[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMyQuestions = async () => {
            try {
                const res = await fetch('/api/questions/me');
                if (!res.ok) throw new Error('Failed to fetch your questions');
                const data = await res.json();
                setUserQuestions(data.questions);
            } catch (err) {
                console.error(err);
                setError('Failed to load your feed data.');
            } finally {
                setIsLoading(false);
            }
        };

        if (status === 'authenticated') {
            fetchMyQuestions();
        } else if (status === 'unauthenticated') {
            setIsLoading(false);
        }
    }, [status]);

    if (status === 'loading' || (isLoading && status === 'authenticated')) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-900">
                <Loader size="12" />
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-white p-8 text-center dark:bg-zinc-900">
                <h1 className="text-2xl font-black tracking-tighter uppercase">Access Denied</h1>
                <p className="mt-2 text-sm font-bold tracking-widest text-zinc-400 uppercase">
                    Please sign in to view your console.
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-white p-8 text-center dark:bg-zinc-900">
                <h1 className="text-2xl font-black tracking-tighter uppercase">Error</h1>
                <p className="mt-2 text-sm font-bold tracking-widest text-zinc-400 uppercase">{error}</p>
            </div>
        );
    }
    return (
        <div className="selection:bg-accent relative min-h-screen bg-white p-8 md:p-12 selection:text-white dark:bg-zinc-900">
            <div className="relative z-10 mx-auto max-w-5xl space-y-16">
                <header className="mb-0 flex flex-col gap-8 border-b-2 border-zinc-900 pb-12 md:flex-row md:items-end md:justify-between dark:border-white">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-15 w-15 items-center justify-center border-2 border-zinc-900 bg-zinc-50 dark:border-white dark:bg-zinc-800">
                                <User className="h-10 w-10 text-zinc-900 dark:text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black tracking-tighter text-zinc-900 uppercase italic dark:text-white">
                                    {session?.user?.name || 'USER'}
                                    <span className="text-accent">_</span>
                                </h1>
                                <p className="text-[10px] font-medium text-zinc-400">
                                    IDENTITY: {session?.user?.username || 'UNKNOWN'}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="border border-zinc-900 px-3 py-1 dark:border-white">
                                <p className="text-[8px] font-black text-zinc-400 uppercase">Role</p>
                                <p className="text-xs font-black uppercase">{session?.user?.role || 'Citizen'}</p>
                            </div>
                            <div className="border border-zinc-900 bg-zinc-900 px-3 py-1 text-white dark:border-white dark:bg-white dark:text-zinc-900">
                                <p className="text-[8px] font-black uppercase opacity-50">Status</p>
                                <p className="text-xs font-black uppercase italic">AUTHORIZED</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="mt-8 flex flex-col gap-12">
                    <main>
                        <h1 className="mb-8 text-2xl font-black tracking-tighter uppercase">Your asked questions</h1>
                        {userQuestions.length > 0 ? (
                            <div className="flex flex-col gap-12">
                                {userQuestions.map(q => (
                                    <Link key={q.id} href={`/me/question/${q.id}`}>
                                        <FeedCard
                                            id={q.id}
                                            question={q.question}
                                            description={q.description}
                                            username={q.username}
                                            createdAt={q.createdAt}
                                            questionType={q.questionType}
                                            isResponseInputVisible={false}
                                            responses={q.responses}
                                        />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 py-20 dark:border-zinc-700">
                                <p className="text-xs font-black tracking-widest text-zinc-400 uppercase">
                                    No question found
                                </p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
