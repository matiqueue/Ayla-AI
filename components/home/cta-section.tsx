'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check, Star, Zap, Shield, ArrowRight, Globe, Lock, Brain } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import React from 'react'

const pricingPlans = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Perfect for getting started with AI assistance',
    features: [
      'Basic AI responses',
      '5 conversations per day',
      'Standard response time',
      'Basic content generation',
    ],
    badge: '',
    buttonText: 'Get Started',
    buttonVariant: 'outline' as const,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'Advanced features for professionals and teams',
    features: [
      'Advanced AI capabilities',
      'Unlimited conversations',
      'Priority response time',
      'Advanced content generation',
      'Custom AI training',
      'API access',
    ],
    badge: 'Most Popular',
    buttonText: 'Start Free Trial',
    buttonVariant: 'default' as const,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Tailored solutions for large organizations',
    features: [
      'All Pro features',
      'Dedicated support',
      'Custom integrations',
      'Advanced security features',
      'User management',
      'Usage analytics',
    ],
    badge: '',
    buttonText: 'Contact Sales',
    buttonVariant: 'outline' as const,
  },
]

const whyChooseReasons = [
  {
    icon: <Zap className="h-8 w-8 text-purple-500" />,
    title: 'Lightning Fast',
    description:
      'Get responses in milliseconds, not minutes. AylaAI is optimized for speed and efficiency.',
    bgColor: 'bg-purple-500/15',
  },
  {
    icon: <Star className="h-8 w-8 text-cyan-500" />,
    title: 'Highly Accurate',
    description:
      'Trained on vast datasets to provide precise and relevant information every time you need it.',
    bgColor: 'bg-cyan-500/15',
  },
  {
    icon: <Shield className="h-8 w-8 text-blue-500" />,
    title: 'Secure & Private',
    description:
      'Your data is encrypted and never shared with third parties. We prioritize your privacy.',
    bgColor: 'bg-blue-500/15',
  },
  {
    icon: <Brain className="h-8 w-8 text-green-500" />,
    title: 'Continuously Learning',
    description:
      'AylaAI gets smarter with every interaction. Our AI continuously learns from user feedback.',
    bgColor: 'bg-green-500/15',
  },
  {
    icon: <Globe className="h-8 w-8 text-orange-500" />,
    title: 'Multilingual Support',
    description: 'Communicate in over 50 languages with accurate translation and localization.',
    bgColor: 'bg-orange-500/15',
  },
  {
    icon: <Lock className="h-8 w-8 text-red-500" />,
    title: 'Compliance Ready',
    description: 'Meet regulatory requirements with our compliance-ready AI solution.',
    bgColor: 'bg-red-500/15',
  },
]

interface CTAProps {
  showSection: 'pricing' | 'why-choose' | 'footer'
}

export function CTASection({ showSection }: CTAProps) {
  if (showSection === 'pricing') {
    return (
      <section className="h-screen w-full relative py-8 md:py-12 flex items-center">
        {/* Dynamic background elements */}
        <div className="absolute inset-0 bg-linear-to-r from-purple-500/15 to-cyan-500/15 dark:from-purple-500/25 dark:to-cyan-500/25 pointer-events-none" />

        <motion.div
          className="absolute top-10 right-[20%] w-64 h-64 rounded-full bg-purple-500/15 dark:bg-purple-500/25 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 8,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute bottom-20 left-[10%] w-72 h-72 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 10,
            ease: 'easeInOut',
          }}
        />

        <div className="container mx-auto px-4 relative z-10 overflow-y-auto max-h-screen pb-8">
          <div className="max-w-4xl mx-auto text-center mb-6 md:mb-8">
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              Ready to Experience the Power of AI?
            </motion.h2>

            <motion.p
              className="text-base md:text-lg lg:text-xl text-foreground mb-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              Choose the plan that&apos;s right for you and start your journey today.
            </motion.p>
          </div>

          {/* Pricing Plans - Fixed width on larger screens */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true, margin: '-100px' }}
                  className="flex"
                >
                  <Card className="h-full w-full border border-border/40 bg-card/90 backdrop-blur-xs dark:bg-card/80 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden flex flex-col">
                    {plan.badge && (
                      <div className="absolute top-0 right-0">
                        <Badge className="m-2 bg-linear-to-r from-purple-500 to-cyan-500 text-white font-medium px-2 py-0.5 text-xs">
                          {plan.badge}
                        </Badge>
                      </div>
                    )}
                    <CardContent className="pt-4 px-4 pb-4 flex flex-col grow">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                        <div className="flex items-baseline mb-2">
                          <span className="text-3xl font-bold">{plan.price}</span>
                          {plan.period && (
                            <span className="text-muted-foreground ml-1 text-sm">
                              {plan.period}
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-3 text-sm">{plan.description}</p>
                        <ul className="space-y-2 mb-4 text-sm">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                              <span className="text-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-auto pt-4">
                        <Button
                          className={`w-full text-sm py-2 ${
                            plan.name === 'Pro'
                              ? 'bg-linear-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white'
                              : ''
                          }`}
                          variant={plan.buttonVariant}
                          size="sm"
                        >
                          {plan.buttonText}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // In the "why-choose" section, make content more compact and fit within viewport
  if (showSection === 'why-choose') {
    return (
      <section className="min-h-screen w-full relative py-8 md:py-12 flex items-center">
        {/* Background with controlled overflow */}
        <div className="absolute inset-0 bg-linear-to-b from-background via-muted/30 to-background/80 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-40 left-[15%] w-80 h-80 rounded-full bg-purple-500/10 dark:bg-purple-500/15 blur-3xl"
            animate={{
              x: [0, 40, 0],
              y: [0, -20, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 12,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-40 right-[15%] w-96 h-96 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 15,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            Why Choose AylaAI?
          </motion.h2>

          <motion.p
            className="text-base md:text-lg lg:text-xl text-center text-foreground mb-8 md:mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            AylaAI combines cutting-edge technology with intuitive design to deliver an AI assistant
            that truly understands your needs.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {whyChooseReasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <Card className="h-full border border-border/40 bg-card/90 backdrop-blur-xs dark:bg-card/80 transition-all hover:translate-y-[-2px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_16px_rgba(0,0,0,0.3)]">
                  <CardContent className="p-4 md:p-6 flex flex-col h-full">
                    <div
                      className={`p-2 md:p-3 rounded-full ${reason.bgColor} mb-4 w-10 md:w-12 h-10 md:h-12 flex items-center justify-center`}
                    >
                      {React.cloneElement(reason.icon as React.ReactElement, {})}
                    </div>
                    <h4 className="text-base md:text-lg font-semibold mb-2">{reason.title}</h4>
                    <p className="text-foreground text-sm md:text-base flex-grow">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // For the "footer" section, remove the actual footer and keep only the "Ready to Get Started?" part
  if (showSection === 'footer') {
    return (
      <section className="h-screen w-full relative py-8 md:py-12 flex items-center">
        {/* Dynamic background with blur effect */}
        <div className="absolute inset-0 bg-linear-to-b from-muted/30 to-background/90 pointer-events-none backdrop-blur-xs" />

        <motion.div
          className="absolute top-20 right-[30%] w-72 h-72 rounded-full bg-purple-500/10 dark:bg-purple-500/20 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 10,
            ease: 'easeInOut',
          }}
        />

        <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center h-full">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              Ready to Get Started?
            </motion.h2>

            <motion.p
              className="text-base md:text-lg lg:text-xl text-foreground mb-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              Join thousands of users who are already supercharging their productivity with AylaAI.
              Our platform is designed to help you work smarter, not harder.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <Button
                size="lg"
                className="bg-linear-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 md:text-lg lg:text-xl md:py-6 lg:py-8 md:px-8 lg:px-10"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="md:text-lg lg:text-xl md:py-6 lg:py-8 md:px-8 lg:px-10"
                asChild
              >
                <Link href="/docs" className="group">
                  Read Documentation
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-500 mb-1 md:mb-2">
                  10,000+
                </h3>
                <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
                  Active Users
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-cyan-500 mb-1 md:mb-2">
                  5M+
                </h3>
                <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
                  AI Interactions
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-500 mb-1 md:mb-2">
                  99.9%
                </h3>
                <p className="text-muted-foreground text-sm md:text-base lg:text-lg">Uptime</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  return null
}
