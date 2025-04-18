'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  const [theme, setTheme] = useState<'dark' | 'light' | 'custom'>('dark')
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | 'custom' | null
      if (savedTheme) {
        setTheme(savedTheme)
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        setTheme('light')
      }
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    const storageHandler = (e: StorageEvent) => {
      if (e.key === 'theme' && e.newValue) {
        setTheme(e.newValue as 'dark' | 'light' | 'custom')
      }
    }
    window.addEventListener('storage', storageHandler)
    return () => {
      window.removeEventListener('storage', storageHandler)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasDimensions()
    window.addEventListener('resize', setCanvasDimensions)
    const particleCount = 70
    const particles: {
      x: number
      y: number
      radius: number
      color: string
      speedX: number
      speedY: number
      opacity: number
      fadeDirection: number
    }[] = []
    for (let i = 0; i < particleCount; i++) {
      const baseColor =
        theme === 'dark'
          ? 'rgba(120, 120, 120, 0.5)'
          : theme === 'light'
            ? 'rgba(59, 130, 246, 0.3)'
            : 'rgba(59, 130, 246, 0.3)'
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + 1,
        color: baseColor,
        speedX: Math.random() * 1.5 - 0.75,
        speedY: Math.random() * 1.5 - 0.75,
        opacity: Math.random() * 0.5 + 0.1,
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
      })
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((particle) => {
        particle.opacity += 0.005 * particle.fadeDirection
        if (particle.opacity >= 0.6) {
          particle.fadeDirection = -1
        } else if (particle.opacity <= 0.1) {
          particle.fadeDirection = 1
        }
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        const particleColor =
          theme === 'dark'
            ? `rgba(120, 120, 120, ${particle.opacity})`
            : theme === 'light'
              ? `rgba(59, 130, 246, ${particle.opacity})`
              : `rgba(59, 130, 246, ${particle.opacity})`
        ctx.fillStyle = particleColor
        ctx.fill()
        particle.x += particle.speedX
        particle.y += particle.speedY
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY
        }
      })
      requestAnimationFrame(animate)
    }
    animate()
    return () => {
      window.removeEventListener('resize', setCanvasDimensions)
    }
  }, [mounted, theme])

  const themeClasses = {
    background:
      theme === 'dark'
        ? 'bg-gradient-to-b from-black/5 to-black/5 text-white'
        : theme === 'light'
          ? 'bg-gradient-to-b from-blue-50 via-white to-blue-50 text-slate-900'
          : 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white',
    title:
      theme === 'dark'
        ? 'bg-gradient-to-r from-gray-400 to-gray-200'
        : theme === 'light'
          ? 'bg-gradient-to-r from-blue-600 to-purple-800'
          : 'bg-gradient-to-r from-blue-400 to-purple-600',
    subtitle: theme === 'dark' ? 'text-white' : theme === 'light' ? 'text-slate-900' : 'text-white',
    text:
      theme === 'dark' ? 'text-gray-400' : theme === 'light' ? 'text-slate-600' : 'text-slate-300',
    button:
      theme === 'dark'
        ? 'bg-gradient-to-r from-gray-800 to-gray-600 hover:from-gray-700 hover:to-gray-500 text-white'
        : theme === 'light'
          ? 'bg-gradient-to-br from-blue-600 to-purple-700 text-white hover:shadow-blue-600/20'
          : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:shadow-blue-500/30',
    blob1: theme === 'dark' ? 'bg-gray-600' : theme === 'light' ? 'bg-blue-300' : 'bg-blue-500',
    blob2: theme === 'dark' ? 'bg-gray-500' : theme === 'light' ? 'bg-purple-300' : 'bg-purple-500',
    blob3: theme === 'dark' ? 'bg-gray-400' : theme === 'light' ? 'bg-pink-300' : 'bg-pink-500',
    blob4: theme === 'dark' ? 'bg-gray-300' : theme === 'light' ? 'bg-cyan-300' : 'bg-cyan-500',
  }

  return (
    <div
      className={`relative min-h-screen w-full flex flex-col items-center justify-center ${themeClasses.background} overflow-hidden transition-colors duration-300`}
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        .font-space {
          font-family: 'Space Grotesk', sans-serif;
        }
        @keyframes slideInFromBottom {
          0% {
            transform: translateY(50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slideInFromBottom 0.8s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 1.2s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 100ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-400 {
          animation-delay: 400ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
      <div className="z-10 flex flex-col items-center justify-center px-4 text-center">
        <div
          className={`transition-all duration-1000 ease-in-out ${mounted ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="overflow-hidden">
            <h1
              className="font-space text-8xl md:text-9xl font-bold mb-2 animate-slide-in opacity-0"
              style={{ animationDelay: '100ms' }}
            >
              <span className={`bg-clip-text text-transparent ${themeClasses.title}`}>404</span>
            </h1>
          </div>
          <div className="overflow-hidden">
            <h2
              className={`font-space text-2xl md:text-4xl font-bold mb-6 animate-slide-in opacity-0 ${themeClasses.subtitle}`}
              style={{ animationDelay: '200ms' }}
            >
              Page Not Found
            </h2>
          </div>
          <div className="overflow-hidden mb-10">
            <p
              className={`text-lg md:text-xl animate-slide-in opacity-0 ${themeClasses.text}`}
              style={{ animationDelay: '300ms' }}
            >
              Oops, the page you&apos;re looking for doesn&apos;t exist.
            </p>
          </div>
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '500ms' }}>
            <Link
              href="/home"
              className={`group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-md ${themeClasses.button} font-medium transition-all duration-300 ease-out hover:shadow-lg`}
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-md group-hover:w-full group-hover:h-full opacity-10"></span>
              <span className="relative flex items-center">
                <span>Back to Home</span>
                <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-2" />
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        {mounted && (
          <>
            <div
              className={`absolute top-1/4 left-1/4 w-40 h-40 ${themeClasses.blob1} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob`}
            ></div>
            <div
              className={`absolute top-3/4 left-1/2 w-40 h-40 ${themeClasses.blob2} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000`}
            ></div>
            <div
              className={`absolute top-1/3 left-2/3 w-40 h-40 ${themeClasses.blob3} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000`}
            ></div>
            <div
              className={`absolute bottom-1/4 right-1/4 w-32 h-32 ${themeClasses.blob4} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-3000`}
            ></div>
          </>
        )}
      </div>
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
