'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check, Star, Zap, Shield } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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

export function CTASection() {
  return (
    <section
      id="cta-section"
      className="min-h-screen flex items-center py-20 relative overflow-hidden"
    >
      {/* Enhanced background with stronger gradient for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/15 to-cyan-500/15 dark:from-purple-500/25 dark:to-cyan-500/25 pointer-events-none" />

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

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            Ready to Experience the Power of AI?
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-foreground mb-8 max-w-2xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            Join thousands of users who are already transforming their workflow with AylaAI. Choose
            &apos;s right for you and start your journey today.
          </motion.p>
        </div>

        {/* Pricing Plans - Improved responsiveness */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
              className="flex" // Added flex to ensure full height on mobile
            >
              <Card className="h-full w-full border border-border/40 bg-card/90 backdrop-blur-sm dark:bg-card/80 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
                {plan.badge && (
                  <div className="absolute top-0 right-0">
                    <Badge className="m-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium px-3 py-1">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <CardContent className="pt-8 px-6 pb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground ml-1">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full text-base py-6 ${
                      plan.name === 'Pro'
                        ? 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white'
                        : ''
                    }`}
                    variant={plan.buttonVariant}
                    size="lg"
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Benefits - Improved for mobile */}
        <div className="mt-20 max-w-5xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Choose AylaAI?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <div className="p-4 rounded-full bg-purple-500/15 mb-6">
                <Zap className="h-8 w-8 text-purple-500" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Lightning Fast</h4>
              <p className="text-foreground">
                Get responses in milliseconds, not minutes. AylaAI is optimized for speed and
                efficiency.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <div className="p-4 rounded-full bg-cyan-500/15 mb-6">
                <Star className="h-8 w-8 text-cyan-500" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Highly Accurate</h4>
              <p className="text-foreground">
                Trained on vast datasets to provide precise and relevant information every time you
                need it.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <div className="p-4 rounded-full bg-blue-500/15 mb-6">
                <Shield className="h-8 w-8 text-blue-500" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Secure & Private</h4>
              <p className="text-foreground">
                Your data is encrypted and never shared with third parties. We prioritize your
                privacy.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Final CTA - Enhanced visibility */}
        <motion.div
          className="mt-20 text-center bg-gradient-to-r from-purple-500/10 to-cyan-500/10 dark:from-purple-500/20 dark:to-cyan-500/20 p-8 md:p-12 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">Start Your AI Journey Today</h3>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-lg py-6 px-8"
          >
            Start Your Free Trial
          </Button>
          <p className="mt-6 text-foreground font-medium">
            No credit card required. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
