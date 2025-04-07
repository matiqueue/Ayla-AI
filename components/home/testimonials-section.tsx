'use client'

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
]

export function TestimonialsSection() {
  return (
    <section id="testimonials-section" className="min-h-screen flex items-center py-20 relative">
      {/* Enhanced background with subtle gradient for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-muted/30 to-background/50 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            What Our Users Say
          </motion.h2>
          <p className="text-lg text-foreground max-w-2xl mx-auto font-medium">
            Discover how AylaAI is helping people transform their work and productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
              className="flex" // Added flex to ensure full height on mobile
            >
              <Card className="h-full border border-border/40 bg-card/90 backdrop-blur-sm dark:bg-card/80 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-8 px-6 pb-6">
                  <Quote className="h-10 w-10 text-purple-400 mb-6" />
                  <p className="text-xl mb-8 leading-relaxed">{testimonial.quote}</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <Avatar className="h-12 w-12 border-2 border-purple-200 dark:border-purple-900">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-cyan-500 text-white">
                        {testimonial.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-lg">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
