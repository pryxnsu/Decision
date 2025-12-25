'use client';

import { useState } from 'react';
import { User, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { normalizeDate } from '@/lib/helper';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

interface FeedCardProps {
    id: string;
    question: string;
    description: string;
    username: string;
    createdAt: string;
    questionType?: string;
    responses?: number;
    isResponseInputVisible: boolean;
    className?: string;
}

export function FeedCard({
    id,
    question,
    description,
    username,
    createdAt,
    questionType,
    responses = 0,
    isResponseInputVisible,
    className,
}: FeedCardProps) {
    const { data: session } = useSession();
    const [isResponding, setIsResponding] = useState(false);
    const [response, setResponse] = useState('');

    const handleResponseSubmit = async () => {
        if (!response || response.trim() === '') {
            return;
        }

        if (!session?.user) {
            toast.error('Please sign in to send a response');
            return;
        }
        try {
            const res = await fetch('/api/responses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    questionId: id,
                    response,
                }),
            });
            if (!res.ok) {
                throw new Error('Failed to create response');
            }

            toast('Your response has been sent');
            setIsResponding(false);
            setResponse('');
        } catch (err: unknown) {
            console.error('[DB Error] in handle response submit', err);
            throw err;
        }
    };
    return (
        <div className={cn('group relative flex flex-col transition-all duration-300', className)}>
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-black/5 transition-transform group-hover:translate-x-2 group-hover:translate-y-2 dark:bg-white/5" />
            <div className="relative flex flex-col border border-zinc-900 bg-white p-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-zinc-900 dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <div className="h-1.5 w-full bg-zinc-900 dark:bg-white" />
                <div className="flex flex-col lg:flex-row">
                    <div className="flex shrink-0 flex-row items-center justify-between gap-4 border-b border-zinc-900 bg-zinc-50 p-4 lg:w-48 lg:flex-col lg:items-start lg:justify-between lg:border-r lg:border-b-0 dark:border-white dark:bg-zinc-800">
                        <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                            <div className="relative h-12 w-12 border border-zinc-900 bg-white dark:border-white dark:bg-zinc-950">
                                <div className="flex h-full w-full items-center justify-center">
                                    <User className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-[10px] font-black tracking-tighter text-zinc-400 uppercase">
                                    Author
                                </p>
                                <p className="text-xs font-black tracking-tight">@{username}</p>
                            </div>
                        </div>

                        <div className="hidden space-y-3 md:block">
                            <div className="space-y-0.5">
                                <p className="text-[10px] font-black tracking-tighter text-zinc-400 uppercase">
                                    Timestamp
                                </p>
                                <p className="text-[10px] font-bold">{normalizeDate(createdAt)}</p>
                            </div>
                            <div className="bg-accent inline-block border border-zinc-900 px-2 py-0.5 text-[9px] font-black text-white uppercase dark:border-white dark:text-black">
                                {questionType}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6 lg:p-8">
                        <div className="flex-1 space-y-6">
                            <h3 className="text-2xl leading-[1.1] font-semibold tracking-tighter md:text-3xl lg:text-4xl">
                                {question}
                            </h3>
                            <div className="relative">
                                <p className="text-sm leading-relaxed font-medium text-zinc-600 italic dark:text-zinc-400">
                                    &ldquo;{description}&rdquo;
                                </p>
                            </div>
                        </div>

                        <div className="mt-10">
                            {!isResponding ? (
                                <div className="flex items-end justify-between">
                                    <div className="flex gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">
                                                Total responses
                                            </span>
                                            <div className="mt-1 flex items-center gap-2">
                                                <div className="flex items-center gap-1.5 border border-zinc-900 px-2 py-1 dark:border-white">
                                                    <MessageCircle className="h-3 w-3" />
                                                    <span className="text-[10px] font-black">{responses}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {isResponseInputVisible === true && (
                                        <Button
                                            variant="ghost"
                                            onClick={() => setIsResponding(true)}
                                            className="group/btn relative flex h-12 items-center justify-center overflow-hidden rounded-none border-none px-8 hover:bg-transparent"
                                        >
                                            <div className="absolute inset-0 translate-x-full bg-zinc-900 transition-transform duration-300 group-hover/btn:translate-x-0 dark:bg-white" />
                                            <span className="relative z-10 text-[11px] font-black tracking-[0.3em] uppercase transition-colors duration-300 group-hover/btn:text-white dark:group-hover/btn:text-black">
                                                Engage →
                                            </span>
                                            <div className="bg-accent absolute inset-x-0 bottom-0 h-0.5" />
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                <div className="animate-in fade-in slide-in-from-top-2 space-y-4 duration-300">
                                    <div className="shadow-hard relative border-2 border-zinc-900 bg-zinc-50 dark:border-white dark:bg-zinc-800 dark:shadow-[4px_4px_0px_0px_#fff]">
                                        <div className="absolute -top-3 left-4 bg-zinc-900 px-2 py-0.5 text-[8px] font-black text-white uppercase dark:bg-white dark:text-zinc-900">
                                            RESPONSE_LOG
                                        </div>
                                        <Textarea
                                            value={response}
                                            onChange={e => setResponse(e.target.value)}
                                            placeholder="WRITE YOUR TAKE..."
                                            className="min-h-30 rounded-none border-none bg-transparent p-4 text-sm font-black tracking-tight shadow-none placeholder:text-zinc-400 focus-visible:ring-0"
                                        />
                                        <div className="absolute right-2 bottom-2">
                                            <div className="flex gap-1">
                                                {[1, 2, 3].map(i => (
                                                    <div
                                                        key={i}
                                                        className="h-1 w-1 bg-zinc-900 opacity-20 dark:bg-white"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-4">
                                        <Button
                                            onClick={() => setIsResponding(false)}
                                            className="cursor-pointer text-[10px] font-black tracking-[0.2em] text-white uppercase transition-colors dark:hover:text-white"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            className="group/transmit relative cursor-pointer overflow-hidden bg-zinc-900 px-8 py-2 dark:bg-white"
                                            onClick={() => {
                                                console.log('Submitting:', response);
                                                handleResponseSubmit();
                                                setIsResponding(false);
                                                setResponse('');
                                            }}
                                        >
                                            <span className="relative z-10 text-[10px] font-black tracking-[0.2em] text-white uppercase dark:text-zinc-900">
                                                Submit
                                            </span>
                                            <div className="bg-accent absolute inset-x-0 bottom-0 h-1" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
