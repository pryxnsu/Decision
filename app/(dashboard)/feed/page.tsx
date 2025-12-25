'use client';

import { FeedCard } from '@/components/FeedCard';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { Activity, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Loader from '@/components/Loader';
import { toast } from 'sonner';
import { createQuestionSchema } from '@/lib/zod/schema';

interface QuestionProp {
    id: string;
    question: string;
    description: string;
    username: string;
    createdAt: string;
    questionType: string;
    responses?: number;
}

export default function Page() {
    const { data: session } = useSession();
    const [questions, setQuestions] = useState<QuestionProp[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isWriting, setIsWriting] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch('/api/questions', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    throw new Error(`Response status: ${res.status}`);
                }

                const data = await res.json();
                setQuestions(data.questions);
            } catch (err: unknown) {
                console.error('[Error] while fetching questions', err);
                setError('Failed to fetch questions');
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuestions();
    }, [session]);

    const handleQuestionSubmit = async () => {
        const validation = createQuestionSchema.safeParse({
            question: title,
            questionType: category,
            description: description,
        });

        if (!validation.success) {
            validation.error.issues.forEach(issue => {
                toast.error(issue.message);
            });
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch('/api/questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(validation.data),
            });

            if (!res.ok) {
                throw new Error(`Response status: ${res.status}`);
            }

            const data = await res.json();
            setQuestions([data.question, ...questions]);
            setTitle('');
            setCategory('');
            setDescription('');
            toast.success('Your question has been sent');
        } catch (err: unknown) {
            console.log('[Error] while submit question', err);
            toast.error('Failed to submit question');
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div className="bg-background selection:bg-accent relative min-h-screen px-6 py-8 selection:text-white md:px-8 lg:px-16">
            <h2 className="mt-2 mb-10 text-center text-3xl font-black tracking-tighter text-zinc-900 uppercase italic md:hidden dark:text-white">
                Decision<span className="text-accent">_</span>
            </h2>
            <div className="relative z-10 mx-auto max-w-6xl space-y-8 md:space-y-12">
                <Activity mode={isWriting ? 'visible' : 'hidden'}>
                    <div className="animate-in fade-in slide-in-from-top-2 space-y-6 duration-500">
                        <div className="shadow-hard relative border-2 border-zinc-900 bg-white p-1 dark:border-white dark:bg-zinc-900">
                            <div className="flex flex-col gap-0 md:flex-row">
                                <div className="w-full space-y-6 border-b-2 border-zinc-900 bg-zinc-50 p-6 md:w-64 md:border-r-2 md:border-b-0 dark:border-white dark:bg-zinc-800">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">
                                            Category
                                        </label>
                                        <Input
                                            value={category}
                                            onChange={e => setCategory(e.target.value)}
                                            placeholder="E.G. CAREER"
                                            className="focus-visible:ring-accent h-10 rounded-none border-zinc-900 bg-white text-xs font-black tracking-tight dark:border-white dark:bg-zinc-900"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 space-y-6 p-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">
                                            Objective / Title
                                        </label>
                                        <Input
                                            value={title}
                                            onChange={e => setTitle(e.target.value)}
                                            placeholder="WHAT IS THE DILEMMA?"
                                            className="focus-visible:ring-accent h-12 rounded-none border-2 border-zinc-900 bg-white text-lg font-black tracking-tighter dark:border-white dark:bg-zinc-900"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">
                                            Full Context
                                        </label>
                                        <Textarea
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                            placeholder="EXPAND ON THE SITUATION..."
                                            className="focus-visible:ring-accent min-h-32 rounded-none border-2 border-zinc-900 bg-zinc-50/50 p-4 text-sm leading-relaxed font-medium italic dark:border-white dark:bg-zinc-800/50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end px-1">
                            <div className="flex gap-4">
                                <Button
                                    onClick={() => {
                                        setTitle('');
                                        setCategory('');
                                        setDescription('');
                                        setIsWriting(false);
                                    }}
                                    className="text-[10px] font-black tracking-[0.2em] text-white uppercase transition-colors dark:hover:text-white"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={submitting || !title || !description || !category}
                                    onClick={handleQuestionSubmit}
                                    className="group/transmit relative overflow-hidden bg-zinc-900 px-12 py-3 disabled:opacity-50 dark:bg-white"
                                >
                                    <span className="relative z-10 text-[10px] font-black tracking-[0.3em] text-white uppercase dark:text-zinc-900">
                                        {submitting ? 'Processing...' : 'Submit'}
                                    </span>
                                    <div className="bg-accent absolute inset-x-0 bottom-0 h-1" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Activity>
                <Activity mode={isWriting ? 'hidden' : 'visible'}>
                    <Button
                        variant="default"
                        onClick={() => setIsWriting(true)}
                        className="relative h-12 w-full overflow-hidden rounded-none border-none px-8"
                    >
                        Write your question
                    </Button>
                </Activity>

                <div className="flex h-full min-h-[63vh] w-full max-w-full flex-col gap-8 border-t-2 border-zinc-900 pt-8 md:gap-12 md:pt-12 dark:border-white">
                    {isLoading ? (
                        <div className="h-full w-full">
                            <Loader size="8" />
                        </div>
                    ) : questions.length === 0 ? (
                        <div className="text-center">No questions found</div>
                    ) : (
                        questions.map(post => (
                            <FeedCard
                                key={post.id}
                                id={post.id}
                                question={post.question}
                                description={post.description}
                                username={post.username}
                                createdAt={post.createdAt}
                                questionType={post.questionType}
                                isResponseInputVisible={true}
                                responses={post.responses}
                            />
                        ))
                    )}

                    {error && <div className="text-center text-red-500">{error}</div>}
                </div>

                <footer className="mt-20 border-t-2 border-zinc-900 pt-8 text-center dark:border-white">
                    <Link href="https://github.com/pryxnsu" className="text-[10px] font-black text-zinc-400">
                        DESIGNED BY Priyanshu Kumar
                    </Link>
                </footer>
            </div>
        </div>
    );
}
