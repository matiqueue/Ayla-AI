'use client'

import { motion } from 'framer-motion'
import { Check, CheckCircle } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useState, useEffect, useRef } from 'react'
import { SectionNavigator } from '@/components/home/section-navigator'

export default function BuyLicensePage() {
  const [, setCurrentSection] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const sections = ['Hero', 'Pricing', 'Features', 'FAQ', 'CTA']

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollPosition = scrollContainerRef.current.scrollTop
        const windowHeight = window.innerHeight
        const currentIndex = Math.round(scrollPosition / windowHeight)
        setCurrentSection(currentIndex)
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleSectionChange = (index: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth',
      })
    }
  }

  const pricingPlans = [
    {
      name: 'Basic',
      price: '$29',
      period: '/month',
      description: 'Perfect for individuals and small projects',
      features: [
        'Access to core AI features',
        'Up to 100 queries per day',
        'Standard response time',
        'Email support',
        '1 project',
      ],
      buttonText: 'Get Started',
      buttonVariant: 'outline',
    },
    {
      name: 'Pro',
      price: '$79',
      period: '/month',
      description: 'Ideal for professionals and growing teams',
      features: [
        'All Basic features',
        'Up to 1,000 queries per day',
        'Priority response time',
        '24/7 priority support',
        '5 projects',
        'Advanced analytics',
      ],
      buttonText: 'Get Pro',
      buttonVariant: 'default',
      badge: 'Most Popular',
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: '/month',
      description: 'For organizations with advanced needs',
      features: [
        'All Pro features',
        'Unlimited queries',
        'Fastest response time',
        'Dedicated account manager',
        'Unlimited projects',
        'Custom integrations',
        'SLA guarantee',
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'outline',
    },
  ]

  const faqs = [
    {
      question: 'What types of licenses do you offer?',
      answer:
        'We offer three main license tiers: Basic, Pro, and Enterprise. Each is designed to meet different needs and scales with your requirements. All licenses include core AI functionality with varying levels of usage limits and support.',
    },
    {
      question: 'Can I upgrade my license later?',
      answer:
        "Yes, you can upgrade your license at any time. When you upgrade, we'll prorate the remaining time on your current license and apply it to your new plan.",
    },
    {
      question: 'Do you offer refunds?',
      answer:
        "We offer a 14-day money-back guarantee for all new purchases. If you're not satisfied with our product, contact our support team within 14 days of purchase for a full refund.",
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'Yes, we offer a 7-day free trial for our Basic and Pro plans. No credit card is required to start your trial.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, PayPal, and bank transfers for Enterprise customers. All payments are processed securely through our payment providers.',
    },
  ]

  return (
    <>
      <div
        id="scroll-container"
        ref={scrollContainerRef}
        className="h-screen overflow-y-auto"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {/* Hero Section */}
        <section className="snap-section h-screen">
          <div className="relative min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 dark:from-gray-800/20 dark:to-gray-700/20 pointer-events-none" />

            <motion.div
              className="absolute top-20 right-[30%] w-72 h-72 rounded-full bg-purple-500/10 dark:bg-gray-700/20 blur-3xl"
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
              className="absolute bottom-10 left-[20%] w-80 h-80 rounded-full bg-cyan-500/10 dark:bg-gray-600/20 blur-3xl"
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

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Badge className="mb-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-700 dark:text-cyan-300 border-none px-3 py-1 text-sm">
                    Unlock the Power of AI
                  </Badge>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-gray-400 dark:to-gray-200">
                    Choose Your Perfect License
                  </h1>

                  <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
                    Get access to cutting-edge AI technology with a license plan that fits your
                    needs. Scale as you grow with flexible options for individuals and enterprises.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 dark:from-gray-800 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-500 text-white"
                    >
                      View Pricing Plans
                    </Button>
                    <Button size="lg" variant="outline">
                      Book a Demo
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="snap-section h-screen">
          <div className="w-full relative py-20">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/15 to-cyan-500/15 dark:from-gray-800/20 dark:to-gray-700/20 pointer-events-none" />

            <motion.div
              className="absolute top-10 right-[20%] w-64 h-64 rounded-full bg-purple-500/15 dark:bg-gray-700/20 blur-3xl"
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
              className="absolute bottom-20 left-[10%] w-72 h-72 rounded-full bg-cyan-500/10 dark:bg-gray-600/20 blur-3xl"
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

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-gray-400 dark:to-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  Ready to Experience the Power of AI?
                </motion.h2>

                <motion.p
                  className="text-lg text-foreground mb-6 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  Choose the plan that&apos;s right for you and start your journey today.
                </motion.p>
              </div>

              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
                  {pricingPlans.map((plan, index) => (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      viewport={{ once: true, margin: '-100px' }}
                      className="flex"
                    >
                      <Card className="h-full w-full border border-border/40 bg-card/90 backdrop-blur-xs dark:bg-card/80 shadow-lg dark:shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-xl dark:hover:shadow-[0_8px_16px_rgba(0,0,0,0.3)] transition-shadow relative overflow-hidden flex flex-col">
                        {plan.badge && (
                          <div className="absolute top-0 right-0">
                            <Badge className="m-2 bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-gray-600 dark:to-gray-400 text-white font-medium px-2 py-0.5 text-xs">
                              {plan.badge}
                            </Badge>
                          </div>
                        )}
                        <CardContent className="pt-6 px-6 pb-6 flex flex-col grow">
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
                            <p className="text-muted-foreground mb-4 text-sm">{plan.description}</p>
                            <ul className="space-y-3 mb-6 text-sm">
                              {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start">
                                  <Check className="h-4 w-4 text-green-500 dark:text-gray-400 mr-2 shrink-0 mt-0.5" />
                                  <span className="text-foreground">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-auto pt-4">
                            <Button
                              className={`w-full ${
                                plan.name === 'Pro'
                                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 dark:from-gray-800 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-500 text-white'
                                  : ''
                              }`}
                              variant={plan.buttonVariant as never}
                              size="lg"
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
          </div>
        </section>

        {/* Features Section */}
        <section className="min-h-screen w-full relative py-8 md:py-12 flex items-center snap-section h-screen">
          {/* Background with controlled overflow */}
          <div className="py-20 relative h-screen w-screen inset-0 bg-gradient-to-b from-background via-muted/30 to-background/80 pointer-events-none overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-gray-400 dark:to-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  Everything You Need in One License
                </motion.h2>

                <motion.p
                  className="text-lg text-foreground/80 mb-6 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  Our licenses include comprehensive features designed to maximize your AI
                  experience
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    icon: (
                      <CheckCircle className="h-10 w-10 text-purple-500 dark:text-purple-300" />
                    ),
                    title: 'Flexible Usage',
                    description:
                      'Scale your usage up or down based on your needs with our flexible licensing options.',
                  },
                  {
                    icon: <CheckCircle className="h-10 w-10 text-cyan-500 dark:text-cyan-300" />,
                    title: 'Regular Updates',
                    description:
                      'Get access to the latest features and improvements with regular updates included in your license.',
                  },
                  {
                    icon: (
                      <CheckCircle className="h-10 w-10 text-purple-500 dark:text-purple-300" />
                    ),
                    title: 'Premium Support',
                    description:
                      'Our dedicated support team is ready to help you with any questions or issues.',
                  },
                  {
                    icon: <CheckCircle className="h-10 w-10 text-cyan-500 dark:text-cyan-300" />,
                    title: 'Advanced Security',
                    description:
                      'Enterprise-grade security features to keep your data safe and secure.',
                  },
                  {
                    icon: (
                      <CheckCircle className="h-10 w-10 text-purple-500 dark:text-purple-300" />
                    ),
                    title: 'API Access',
                    description:
                      'Integrate our AI capabilities into your own applications with our comprehensive API.',
                  },
                  {
                    icon: <CheckCircle className="h-10 w-10 text-cyan-500 dark:text-cyan-300" />,
                    title: 'Custom Solutions',
                    description:
                      'Need something specific? Our Enterprise license includes custom solution development.',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="bg-card/80 backdrop-blur-sm border border-border/40 rounded-lg p-6 shadow-lg dark:shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-xl dark:hover:shadow-[0_8px_16px_rgba(0,0,0,0.3)] transition-shadow"
                  >
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {/* <section className="snap-section h-screen">
        <div className="min-h-screen flex items-center py-10 md:py-0 relative"> */}
        <section className="snap-section h-screen relative">
          <div className="min-h-screen flex items-center py-10 md:py-0 relative bg-gradient-to-b from-background via-muted/30 to-background/80">
            <div className="container mx-auto px-4 relative z-10 flex items-center justify-center h-full">
              <div className="max-w-3xl mx-auto w-full">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-gray-400 dark:to-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  Frequently Asked Questions
                </motion.h2>

                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true, margin: '-100px' }}
                    >
                      <AccordionItem value={`item-${index}`} className="border-b border-border/60">
                        <AccordionTrigger className="text-lg font-medium py-4 hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>

                <motion.div
                  className="mt-10 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  <p className="text-muted-foreground mb-4">
                    Still have questions? We&apos;re here to help.
                  </p>
                  <Button
                    variant="outline"
                    className="border-purple-500/50 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10"
                  >
                    Contact Support
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="snap-section h-screen">
          <div className="min-h-screen flex items-center py-10 md:py-0 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 dark:from-gray-800/20 dark:to-gray-700/20 pointer-events-none" />

            <motion.div
              className="absolute top-10 right-[20%] w-64 h-64 rounded-full bg-purple-500/20 dark:bg-gray-700/30 blur-3xl"
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

            <div className="container mx-auto px-4 relative z-10 flex items-center justify-center h-full">
              <div className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border border-border/40 rounded-xl p-8 md:p-12 shadow-xl">
                <div className="text-center">
                  <motion.h2
                    className="text-2xl md:text-3xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: '-100px' }}
                  >
                    Ready to Get Started?
                  </motion.h2>

                  <motion.p
                    className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true, margin: '-100px' }}
                  >
                    Join thousands of satisfied customers who have transformed their workflow with
                    our AI solutions.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 dark:from-gray-800 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-500 text-white"
                    >
                      Buy License Now
                    </Button>
                    <Button size="lg" variant="outline">
                      Schedule a Demo
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <SectionNavigator sections={sections} onSectionChange={handleSectionChange} />
    </>
  )
}
