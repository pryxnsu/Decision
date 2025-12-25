import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getQuestionById, getResponsesByQuestionId } from '@/lib/db/queries';
import { normalizeDate } from '@/lib/helper';
import { ArrowLeft, Terminal, Clock, User } from 'lucide-react';

export default async function QuestionResponsesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const [questionData, responses] = await Promise.all([getQuestionById(id), getResponsesByQuestionId(id)]);

    if (!questionData) {
        return notFound();
    }
    return (
        <div className="bg-background selection:bg-accent min-h-screen selection:text-white">
            <div className="sticky top-0 z-20 border-b-2 border-zinc-900 bg-zinc-50 p-4 dark:border-white dark:bg-zinc-800">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <Link
                        href="/me"
                        className="hover:text-accent group flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase transition-colors"
                    >
                        <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                        Me
                    </Link>
                </div>
            </div>

            <main className="mx-auto max-w-6xl space-y-16 p-6 md:p-12">
                <section className="space-y-10">
                    <div className="flex flex-col gap-6">
                        <div className="space-y-4">
                            <h1 className="text-3xl leading-[0.95] font-black tracking-tighter text-zinc-900 uppercase italic md:text-4xl dark:text-white">
                                {questionData.question}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="bg-accent shadow-hard inline-block border-2 border-zinc-900 px-4 py-1 text-[10px] font-black tracking-widest text-white uppercase dark:text-black">
                                    {questionData.questionType}
                                </span>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400">
                                    <Clock className="h-3.5 w-3.5" />
                                    {normalizeDate(questionData.createdAt).toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative bg-zinc-50/50 dark:bg-zinc-900/50">
                        <p className="text-lg leading-relaxed font-medium text-zinc-600 italic dark:text-zinc-400">
                            &quot;{questionData.description}&quot;
                        </p>
                    </div>
                </section>

                <section className="space-y-12">
                    <div className="flex items-center gap-6">
                        <h2 className="shrink-0 text-2xl font-black tracking-tighter uppercase">All Responses</h2>
                        <div className="h-0.5 flex-1 bg-zinc-900/10 dark:bg-white/10" />
                    </div>

                    <div className="grid gap-8">
                        {responses.length === 0 ? (
                            <div className="space-y-4 border-2 border-dashed border-zinc-200 p-20 text-center dark:border-zinc-800">
                                <Terminal className="mx-auto h-8 w-8 animate-pulse text-zinc-300" />
                                <p className="text-[10px] font-black tracking-[0.3em] text-zinc-400 uppercase">
                                    Waiting for data signals...
                                </p>
                            </div>
                        ) : (
                            responses.map(res => (
                                <div key={res.id} className="group relative">
                                    <div className="bg-accent/10 absolute inset-0 translate-x-1 translate-y-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
                                    <div className="shadow-hard hover:shadow-hard-hover relative flex flex-col border-2 border-zinc-900 bg-white p-6 transition-all md:p-8 dark:border-white dark:bg-zinc-950">
                                        <div className="mb-6 flex items-center justify-between border-b-2 border-zinc-100 pb-4 dark:border-zinc-800">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center border-2 border-zinc-900 bg-zinc-50 dark:border-white dark:bg-zinc-800">
                                                    <User className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-0.5">
                                                    <p className="text-sm font-black">@{res.username}</p>
                                                    <p className="text-[9px] leading-none font-black tracking-widest text-zinc-400 uppercase">
                                                        {normalizeDate(res.createdAt).toUpperCase()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-lg leading-relaxed font-bold text-zinc-800 dark:text-zinc-200">
                                            {res.response}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
