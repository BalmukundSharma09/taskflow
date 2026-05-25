import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center relative overflow-hidden font-sans selection:bg-white/10">
      
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none" />
      </div>

      <main className="z-10 flex flex-col items-center w-full max-w-5xl px-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out fill-mode-forwards">
        
        {/* Header Section */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-[3.5rem] leading-none md:text-[4.5rem] font-bold tracking-tight text-white">
            TaskFlow
          </h1>
          <p className="text-neutral-400/90 text-lg md:text-[1.1rem] max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
            Modern productivity and task management platform. Organize, track, and<br className="hidden sm:block" /> complete your tasks with ease.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-[50rem]">
          
          {/* Left Card */}
          <div className="group relative flex flex-col items-center text-center p-8 md:py-10 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-500 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)]">
            <h2 className="text-[1.1rem] font-medium text-white/90 mb-1.5">Get Started</h2>
            <p className="text-neutral-400 text-[0.9rem] mb-8 font-light">Create your account and start managing tasks</p>
            <Link 
              href="/sign-up" 
              className="w-full py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors duration-300 shadow-sm"
            >
              Sign Up Free
            </Link>
          </div>

          {/* Right Card */}
          <div className="group relative flex flex-col items-center text-center p-8 md:py-10 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-500 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)]">
            <h2 className="text-[1.1rem] font-medium text-white/90 mb-1.5">Already have an account?</h2>
            <p className="text-neutral-400 text-[0.9rem] mb-8 font-light">Sign in to continue to your dashboard</p>
            <Link 
              href="/sign-in" 
              className="w-full py-2.5 rounded-lg bg-transparent text-white/90 border border-white/10 text-sm font-medium hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>

        </div>

      </main>

      {/* Footer Text */}
      <div className="absolute bottom-28 z-10 animate-in fade-in duration-1000 delay-300 fill-mode-both">
        <p className="text-neutral-500/80 text-[0.8rem] tracking-wide font-light">
          Built with Next.js 16, Tailwind CSS, Prisma & SQLite
        </p>
      </div>

      {/* Next.js/Vercel logo button bottom left */}
      <div className="absolute bottom-6 left-6 w-9 h-9 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-white cursor-pointer hover:bg-[#222] transition-colors z-20 shadow-lg group">
        <span className="text-[13px] font-bold text-white/80 group-hover:text-white transition-colors">N</span>
      </div>
    </div>
  );
}