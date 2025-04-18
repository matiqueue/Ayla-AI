'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { cn } from '@workspace/ui/lib/utils'
import { Button } from '@workspace/ui/components/button'
import Link from 'next/link'

interface CyberBackgroundProps {
  title?: string
  subtitle?: string
  particleCount?: number
  noiseIntensity?: number
  particleSize?: { min: number; max: number }
  className?: string
}

function createNoise() {
  const permutation = [
    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69,
    142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219,
    203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175,
    74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230,
    220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76,
    132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186,
    3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59,
    227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70,
    221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178,
    185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81,
    51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115,
    121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195,
    78, 66, 215, 61, 156, 180,
  ]

  const p = new Array(512)
  for (let i = 0; i < 256; i++) p[256 + i] = p[i] = permutation[i]

  function fade(t: number) {
    return t * t * t * (t * (t * 6 - 15) + 10)
  }

  function lerp(t: number, a: number, b: number) {
    return a + t * (b - a)
  }

  function grad(hash: number, x: number, y: number, z: number) {
    const h = hash & 15
    const u = h < 8 ? x : y
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
  }

  return {
    simplex3: (x: number, y: number, z: number) => {
      const X = Math.floor(x) & 255
      const Y = Math.floor(y) & 255
      const Z = Math.floor(z) & 255

      x -= Math.floor(x)
      y -= Math.floor(y)
      z -= Math.floor(z)

      const u = fade(x)
      const v = fade(y)
      const w = fade(z)

      const A = p[X] + Y
      const AA = p[A] + Z
      const AB = p[A + 1] + Z
      const B = p[X + 1] + Y
      const BA = p[B] + Z
      const BB = p[B + 1] + Z

      return lerp(
        w,
        lerp(
          v,
          lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)),
          lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z))
        ),
        lerp(
          v,
          lerp(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)),
          lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1))
        )
      )
    },
  }
}

// const COLOR_SCHEME = {
//   light: {
//     particle: {
//       color: 'rgba(0, 0, 0, 0.07)',
//     },
//     background: 'rgba(255, 255, 255, 0.12)',
//   },
//   dark: {
//     particle: {
//       color: 'rgba(255, 255, 255, 0.07)',
//     },
//     background: 'rgba(0, 0, 0, 0.12)',
//   },
// } as const

interface Particle {
  x: number
  y: number
  size: number
  velocity: { x: number; y: number }
  life: number
  maxLife: number
}

export default function LandingPage({
  particleCount = 2000,
  noiseIntensity = 0.003,
  particleSize = { min: 0.5, max: 2 },
  className,
}: CyberBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const noise = createNoise()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (!container) return

      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }

    resizeCanvas()

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * (particleSize.max - particleSize.min) + particleSize.min,
      velocity: { x: 0, y: 0 },
      life: Math.random() * 100,
      maxLife: 100 + Math.random() * 50,
    }))

    const animate = () => {
      const isDark = document.documentElement.classList.contains('dark')
      const isLight = document.documentElement.classList.contains('light')
      const isCustom = document.documentElement.classList.contains('custom')

      ctx.fillStyle = isDark
        ? 'rgba(0, 0, 0, 0.1)'
        : isLight
          ? 'rgba(255, 255, 255, 0.1)'
          : isCustom
            ? 'rgba(10, 10, 20, 0.9)'
            : 'rgba(255, 255, 255, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.life += 1
        if (particle.life > particle.maxLife) {
          particle.life = 0
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
        }

        const opacity = Math.sin((particle.life / particle.maxLife) * Math.PI) * 0.3

        const n = noise.simplex3(
          particle.x * noiseIntensity,
          particle.y * noiseIntensity,
          Date.now() * 0.0001
        )

        const angle = n * Math.PI * 4
        particle.velocity.x = Math.cos(angle) * 2
        particle.velocity.y = Math.sin(angle) * 2

        particle.x += particle.velocity.x
        particle.y += particle.velocity.y

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.fillStyle = isCustom
          ? Math.random() > 0.5
            ? `rgba(168, 85, 247, ${opacity})`
            : `rgba(6, 182, 212, ${opacity})`
          : isDark
            ? `rgba(255, 255, 255, ${opacity})`
            : `rgba(0, 0, 0, ${opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [particleCount, noiseIntensity, particleSize, noise])

  return (
    <div
      className={cn(
        'relative w-full h-screen overflow-hidden',
        'bg-white dark:bg-black custom:bg-[rgb(10,10,20)]',
        className
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-black to-black/70 dark:from-white dark:to-white/70 custom:from-purple-500 custom:to-cyan-500 drop-shadow-sm leading-normal">
            Welcome in Ayla!
          </h1>
          <Link href={'/home'}>
            <Button
              variant="ghost"
              className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md
                            bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100
                            custom:bg-gradient-to-r custom:from-purple-500 custom:to-cyan-500 custom:hover:from-purple-600 custom:hover:to-cyan-600
                            text-black dark:text-white custom:text-white transition-all duration-300
                            group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                            hover:shadow-md dark:hover:shadow-neutral-800/50 hover:cursor-pointer"
            >
              <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                Start new session
              </span>
              <span
                className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5
                                transition-all duration-300"
              >
                →
              </span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
