'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote:
      'AylaAI has completely transformed how I work. I save hours every day on content creation and research.',
    author: 'Sarah Johnson',
    role: 'Content Creator',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    quote:
      'The natural language capabilities are incredible. It feels like chatting with a knowledgeable colleague.',
    author: 'Michael Chen',
    role: 'Software Engineer',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    quote:
      'As a small business owner, AylaAI helps me handle customer inquiries and generate marketing content efficiently.',
    author: 'Emma Rodriguez',
    role: 'Business Owner',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    quote:
      "I've tried many AI assistants, but AylaAI stands out with its accuracy and understanding of context.",
    author: 'David Kim',
    role: 'Product Manager',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    quote:
      'The multilingual support is a game-changer for our global team. We can collaborate seamlessly across languages.',
    author: 'Sophia Nguyen',
    role: 'Team Lead',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    quote:
      "AylaAI's ability to analyze data and provide insights has transformed our decision-making process.",
    author: 'James Wilson',
    role: 'Data Analyst',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    quote:
      'The customer support is exceptional. Any questions I have are answered promptly and thoroughly.',
    author: 'Olivia Martinez',
    role: 'Marketing Director',
    avatar: '/placeholder.svg?height=40&width=40',
  },
]

export function TestimonialsSection() {
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollWidth, setScrollWidth] = useState(0)
  const [animationControls] = useState(() => ({
    x: 0,
    animationId: 0,
    speed: 0.5, // pixels per frame
  }))

  // Calculate container dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setScrollWidth(containerRef.current.scrollWidth)
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  // Animation loop with requestAnimationFrame for smoother animation and better pause control
  useEffect(() => {
    const animate = () => {
      if (!isPaused && containerRef.current) {
        // Update position
        animationControls.x -= animationControls.speed

        // Reset position when we've scrolled half the content (for seamless loop)
        const halfScrollWidth = scrollWidth / 2
        if (Math.abs(animationControls.x) >= halfScrollWidth) {
          animationControls.x = 0
        }

        // Apply the transform
        if (containerRef.current.firstChild) {
          ;(containerRef.current.firstChild as HTMLElement).style.transform =
            `translateX(${animationControls.x}px)`
        }
      }

      // Continue animation loop
      animationControls.animationId = requestAnimationFrame(animate)
    }

    // Start animation
    animationControls.animationId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationControls.animationId)
    }
  }, [isPaused, scrollWidth, animationControls])

  // Double the testimonials to create a seamless loop
  const doubledTestimonials = [...testimonials, ...testimonials]

  return (
    <section
      id="testimonials-section"
      className="h-screen flex items-center py-8 md:py-12 relative overflow-hidden bg-background"
    >
      {/* Enhanced background with subtle gradient for better visibility */}
      <div className="absolute inset-0 bg-background pointer-events-none" />

      <div className="container 4xl:max-w-[2000px] mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-gray-400 dark:to-gray-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            What Our Users Say
          </motion.h2>
          <p className="text-base md:text-lg 2xl:text-2xl text-foreground max-w-2xl mx-auto">
            Discover how AylaAI is helping people transform their work and productivity.
          </p>
        </div>

        {/* Scrolling testimonials container */}
        <div
          className="relative overflow-hidden"
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex gap-4 py-4 3xl:py-8">
            {doubledTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.author}-${index}`}
                className="shrink-0 w-[260px] md:w-[300px] 2xl:w-[350px] 3xl:w-[400px]"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className="h-full border border-border/40 bg-card/90 backdrop-blur-xs dark:bg-card/80 transition-all hover:translate-y-[-2px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_16px_rgba(0,0,0,0.3)]">
                  <CardContent className="pt-6 px-4 pb-4">
                    <Quote className="h-6 w-6 2xl:h-8 2xl:w-8 text-purple-400 dark:text-gray-400 mb-4" />
                    <p className="text-sm mb-6 3xl:text-lg line-clamp-4">{testimonial.quote}</p>
                    <div className="flex items-center gap-3 2xl:gap-5 mt-auto">
                      <Avatar className="h-10 w-10 2xl:h-14 2xl:w-14 border-2 border-purple-200 dark:border-gray-700">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-cyan-500 dark:from-gray-600 dark:to-gray-400 text-white text-xs">
                          {testimonial.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm 3xl:text-base">{testimonial.author}</p>
                        <p className="text-xs text-muted-foreground 3xl:text-base">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Gradient overlays do pozostawienia, jeśli chcesz je zachować na bokach.
              Jeśli przeszkadzają, możesz usunąć je również. */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground italic 3xl:text-2xl">
            Hover over the testimonials to pause the animation
          </p>
        </div>
      </div>
    </section>
  )
}
