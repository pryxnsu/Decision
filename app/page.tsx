import Link from "next/link";
import Image from "next/image";

export default function Home() {
    return (
        <div className="relative min-h-screen  flex flex-col selection:bg-accent selection:text-white">
            <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full md:max-w-2/3  px-4">
                <div className="flex w-full flex-row items-center justify-between gap-3 rounded-4xl border border-white/20 px-6 py-3 backdrop-blur-sm bg-white/10 transition-colors duration-1000 md:gap-4 md:px-6 md:py-3">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-black uppercase italic tracking-tighter text-white">
                            Decision<span className="text-accent">_</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest">
                        <Link href="/login" className="px-6 py-2 border-2 border-zinc-900 dark:border-white bg-accent text-white dark:text-black shadow-hard hover:-translate-x-1 hover:-translate-y-1 transition-transform">
                            Login
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <section className="min-h-screen h-fit relative z-10 px-6 py-24 md:py-40 flex flex-col items-center justify-center text-center">
                    <Image loading="eager" src="/hero-bg.webp" alt="" width={500} height={500} className="absolute inset-0 h-full w-full object-cover blur-[1px] transition-opacity duration-1000 opacity-100" />
                    <h1 className="text-4xl md:text-7xl font-black leading-[0.85] tracking-tighter uppercase italic text-zinc-900 dark:text-white mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 drop-shadow-sm">
                        Make Better <br />
                        <span className="text-accent underline decoration-8 underline-offset-8">Decisions</span>.
                    </h1>

                    <p className="max-w-2xl text-lg md:text-2xl font-medium text-zinc-800 dark:text-zinc-200 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 drop-shadow-sm">
                        Ask real questions. Get thoughtful answers, not noise.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <Link href="/feed" className="group relative">
                            <div className="absolute inset-0 bg-accent translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform" />
                            <div className="relative border-2 border-zinc-900 dark:border-white bg-white dark:bg-zinc-900 px-4 py-4 text-md font-black flex items-center gap-3">
                                Start sharing
                            </div>
                        </Link>
                    </div>
                </section>
            </main>

            <footer className="relative border-t border-zinc-900/5 dark:border-white/5 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md py-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-6 text-center">
                    <div className="flex items-center gap-1">
                        <span className="text-2xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
                            Decision<span className="text-accent">_</span>
                        </span>
                    </div>
                    <Link
                        href="https://github.com/pryxnsu"
                        target="_blank"
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-accent transition-colors"
                    >
                        Developed By Pryxnsu // © {new Date().getFullYear()}
                    </Link>
                </div>
            </footer>
        </div>
    );
}
