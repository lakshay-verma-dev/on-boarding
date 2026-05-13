'use client'
import Scene from '@/components/Scene'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import { Clock, LayoutDashboard } from 'lucide-react'

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
    ).fromTo(subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      "-=0.6"
    ).fromTo(buttonsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      "-=0.8"
    )
  }, [])

  return (
    <main className="relative h-screen w-full overflow-hidden font-sans">
      <Scene />
      
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center pointer-events-none px-4 box-border">
        <div className="bg-black/20 backdrop-blur-sm p-12 rounded-3xl border border-white/10 shadow-2xl">
          <h1 
            ref={titleRef} 
            className="text-5xl md:text-7xl font-black text-white tracking-widest uppercase drop-shadow-2xl"
            style={{ opacity: 0 }}
          >
            Attendance<br/><span className="text-blue-500">Portal</span>
          </h1>
          <p 
            ref={subtitleRef}
            className="mt-6 text-xl md:text-2xl font-light text-slate-300 max-w-2xl drop-shadow-md mx-auto"
            style={{ opacity: 0 }}
          >
            Modern Workforce Management. Easily clock in, track hours, and monitor employee productivity in real-time.
          </p>
          
          <div ref={buttonsRef} className="mt-12 flex flex-wrap justify-center gap-6 pointer-events-auto" style={{ opacity: 0 }}>
            <Link href="/login" className="flex items-center gap-2 group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-blue-500/25">
              <Clock size={18} className="group-hover:rotate-12 transition-transform" /> Sign In to System
            </Link>
            <Link href="/admin" className="flex items-center gap-2 group bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg">
              <LayoutDashboard size={18} /> Admin Access
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}