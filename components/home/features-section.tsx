'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, MessageSquare, FileText, Zap, Lock, Globe } from 'lucide-react'

const features = [
  {
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    title: 'Advanced AI',
    description:
      'Powered by state-of-the-art language models for human-like understanding and responses.',
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-cyan-500" />,
    title: 'Natural Conversations',
    description:
      'Chat naturally with AylaAI and get intelligent, contextual responses to your questions.',
  },
  {
    icon: <FileText className="h-6 w-6 text-green-500" />,
    title: 'Content Generation',
    description: 'Create blog posts, emails, social media content, and more with a simple prompt.',
  },
  {
    icon: <Zap className="h-6 w-6 text-orange-500" />,
    title: 'Workflow Automation',
    description: 'Automate repetitive tasks and streamline your workflow with custom AI solutions.',
  },
  {
    icon: <Lock className="h-6 w-6 text-red-500" />,
    title: 'Privacy Focused',
    description: 'Your data stays private with end-to-end encryption and strict privacy controls.',
  },
  {
    icon: <Globe className="h-6 w-6 text-blue-500" />,
    title: 'Multi-language Support',
    description: 'Communicate in over 50 languages with accurate translation and localization.',
  },
]

export function FeaturesSection() {
  return (
    <section
      id="features-section"
      className="min-h-screen flex items-center py-20 bg-muted/50 dark:bg-background/30"
    >
      <div className="container mx-auto px-4 max-w-screen-xl 2xl:max-w-screen-2xl">
        <div className="text-center mb-12 2xl:mb-16">
          <h2 className="text-3xl md:text-3xl xl:text-2xl 2xl:text-5xl 3xl:text-8xl font-bold mb-2 2xl:mb-4">
            Powerful AI Features
          </h2>
          <p className="text-lg xl:text-xl 2xl:w-2xl 3xl:text-4xl text-muted-foreground max-w-2xl mx-auto">
            Discover what makes AylaAI the perfect AI assistant for your personal and professional
            needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <Card className="h-full max-w-md mx-auto border border-border/40 bg-card/50 backdrop-blur-xs hover:shadow-md transition-shadow dark:bg-card/80">
                <CardHeader>
                  <div className="w-10 h-10 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14 rounded-lg bg-background flex items-center justify-center mb-2 dark:bg-background/60">
                    {feature.icon}
                  </div>
                  <CardTitle className="md:text-xl xl:text-xl 2xl:text-2xl 3xl:text-2xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base md:text-lg 3xl:text-2xl">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
