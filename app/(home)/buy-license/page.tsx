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
import Link from 'next/link'

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
      name: 'Tydzień',
      price: '0 PLN',
      period: '/tydzień',
      description: 'Wypróbuj za darmo przez tydzień',
      features: [
        'Pełny dostęp do funkcji AI',
        'Limit 50 zapytań dziennie',
        'Podstawowe wsparcie email',
      ],
      buttonText: 'Zacznij za darmo',
      buttonVariant: 'outline',
      periodValue: 'week',
    },
    {
      name: 'Miesiąc',
      price: '49 PLN',
      period: '/miesiąc',
      description: 'Idealny dla regularnych użytkowników',
      features: [
        'Pełny dostęp do funkcji AI',
        'Limit 500 zapytań dziennie',
        'Priorytetowe wsparcie',
        'Podstawowa analityka',
      ],
      buttonText: 'Kup teraz',
      buttonVariant: 'default',
      badge: 'Najpopularniejszy',
      periodValue: 'month',
    },
    {
      name: 'Rok',
      price: '499 PLN',
      period: '/rok',
      description: 'Najlepsza wartość dla zaawansowanych',
      features: [
        'Pełny dostęp do funkcji AI',
        'Bez limitu zapytań',
        'Dedykowane wsparcie 24/7',
        'Zaawansowana analityka',
        'Wczesny dostęp do nowych funkcji',
      ],
      buttonText: 'Kup teraz',
      buttonVariant: 'outline',
      periodValue: 'year',
    },
  ]

  const faqs = [
    {
      question: 'Jakie rodzaje licencji oferujecie?',
      answer:
        'Oferujemy trzy plany: darmowy na tydzień, miesięczny i roczny. Każdy plan jest dostosowany do różnych potrzeb użytkowników.',
    },
    {
      question: 'Czy mogę zmienić licencję później?',
      answer:
        'Tak, możesz zmienić licencję w dowolnym momencie. Skontaktuj się z nami, aby dostosować plan.',
    },
    {
      question: 'Czy oferujecie zwrot pieniędzy?',
      answer:
        'Tak, oferujemy 14-dniową gwarancję zwrotu pieniędzy dla planów miesięcznych i rocznych.',
    },
    {
      question: 'Czy darmowy plan wymaga karty płatniczej?',
      answer: 'Nie, plan tygodniowy jest całkowicie darmowy i nie wymaga podania danych płatności.',
    },
    {
      question: 'Jakie metody płatności są akceptowane?',
      answer:
        'Akceptujemy karty kredytowe, debetowe oraz PayPal. Wszystkie płatności są bezpieczne.',
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
                  <Badge className="mb-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-700 dark:text-cyan-300 border-none px-3 py-1 text-sm cursor-text">
                    Odblokuj Moc AI
                  </Badge>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-gray-400 dark:to-gray-200 cursor-text leading-normal">
                    Wybierz Swoją Licencję
                  </h1>

                  <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto cursor-text">
                    Uzyskaj dostęp do nowoczesnej technologii AI z planem licencji dopasowanym do
                    Twoich potrzeb.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 dark:from-gray-800 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-500 text-white cursor-pointer"
                      onClick={() => {
                        const pricingSection = document.querySelector(
                          '.snap-section:nth-of-type(2)'
                        )
                        pricingSection?.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      Zobacz Plany
                    </Button>
                    <Button size="lg" variant="outline" className="cursor-pointer">
                      Umów Demo
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="snap-section h-screen relative">
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
          <div className="min-h-screen w-full flex items-center justify-center relative z-10">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-gray-400 dark:to-gray-200 leading-normal"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  Wybierz Swój Plan
                </motion.h2>
                <motion.p
                  className="text-lg text-foreground mb-6 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  Znajdź plan idealny dla Ciebie i zacznij korzystać z AI już dziś.
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
                              <span className="text-muted-foreground ml-1 text-sm">
                                {plan.period}
                              </span>
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
                            <Link href={`/generate-license?period=${plan.periodValue}`}>
                              <Button
                                className={`w-full ${
                                  plan.name === 'Miesiąc'
                                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 dark:from-gray-800 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-500 text-white hover:cursor-pointer'
                                    : 'hover:cursor-pointer'
                                }`}
                                variant={plan.buttonVariant as 'link'}
                                size="lg"
                              >
                                {plan.buttonText}
                              </Button>
                            </Link>
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
          <div className="py-20 relative h-screen w-screen inset-0 bg-gradient-to-b from-background via-muted/30 to-background/80 pointer-events-none overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-gray-400 dark:to-gray-200 hover:cursor-text leading-normal"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  Wszystko w Jednej Licencji
                </motion.h2>

                <motion.p
                  className="text-lg text-foreground/80 mb-6 max-w-2xl mx-auto hover:cursor-text"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  Nasze licencje oferują kompleksowe funkcje dla maksymalnego doświadczenia z AI.
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    icon: (
                      <CheckCircle className="h-10 w-10 text-purple-500 dark:text-purple-300" />
                    ),
                    title: 'Elastyczność',
                    description:
                      'Dostosuj użytkowanie do swoich potrzeb dzięki elastycznym planom.',
                  },
                  {
                    icon: <CheckCircle className="h-10 w-10 text-cyan-500 dark:text-cyan-300" />,
                    title: 'Aktualizacje',
                    description: 'Dostęp do nowych funkcji i ulepszeń w ramach każdej licencji.',
                  },
                  {
                    icon: (
                      <CheckCircle className="h-10 w-10 text-purple-500 dark:text-purple-300" />
                    ),
                    title: 'Wsparcie',
                    description: 'Dedykowany zespół wsparcia dostępny dla wszystkich użytkowników.',
                  },
                  {
                    icon: <CheckCircle className="h-10 w-10 text-cyan-500 dark:text-cyan-300" />,
                    title: 'Bezpieczeństwo',
                    description: 'Zaawansowane funkcje bezpieczeństwa chroniące Twoje dane.',
                  },
                  {
                    icon: (
                      <CheckCircle className="h-10 w-10 text-purple-500 dark:text-purple-300" />
                    ),
                    title: 'API',
                    description: 'Integracja z Twoimi aplikacjami dzięki naszemu API.',
                  },
                  {
                    icon: <CheckCircle className="h-10 w-10 text-cyan-500 dark:text-cyan-300" />,
                    title: 'Niestandardowe Rozwiązania',
                    description:
                      'Roczne plany obejmują możliwość tworzenia dedykowanych rozwiązań.',
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
                    <h3 className="text-xl font-semibold mb-2 hover:cursor-text">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground hover:cursor-text">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="snap-section h-screen relative">
          <div className="min-h-screen flex items-center py-10 md:py-0 relative bg-gradient-to-b from-background via-muted/30 to-background/80">
            <div className="container mx-auto px-4 relative z-10 flex items-center justify-center h-full">
              <div className="max-w-3xl mx-auto w-full">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-gray-400 dark:to-gray-200 hover:cursor-text leading-normal"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  Najczęściej Zadawane Pytania
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
                  <p className="text-muted-foreground mb-4 hover:cursor-text">
                    Masz więcej pytań? Jesteśmy tu, by pomóc.
                  </p>
                  <Button
                    variant="outline"
                    className="border-purple-500/50 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10 cursor-pointer"
                  >
                    Skontaktuj się z nami
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
                    className="text-2xl md:text-3xl font-bold mb-4 hover:cursor-text"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: '-100px' }}
                  >
                    Gotowy, by Zacząć?
                  </motion.h2>

                  <motion.p
                    className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto hover:cursor-text"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true, margin: '-100px' }}
                  >
                    Dołącz do tysięcy zadowolonych użytkowników, którzy zmienili swoje procesy
                    dzięki naszym rozwiązaniom AI.
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
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 dark:from-gray-800 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-500 text-white cursor-pointer"
                      onClick={() => {
                        const pricingSection = document.querySelector(
                          '.snap-section:nth-of-type(2)'
                        )
                        pricingSection?.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      Kup Licencję
                    </Button>
                    <Button size="lg" variant="outline" className="cursor-pointer">
                      Umów Demo
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
