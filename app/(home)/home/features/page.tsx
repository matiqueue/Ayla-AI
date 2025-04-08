import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Brain, MessageSquare, FileText, Zap, Lock, Globe, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Powerful AI Features</h1>
        <p className="text-lg text-muted-foreground">
          Explore the full range of capabilities that make AylaAI the perfect assistant for your
          needs.
        </p>
      </div>

      <Tabs defaultValue="ai" className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="ai">AI Capabilities</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                Advanced Language Processing
              </CardTitle>
              <CardDescription>
                State-of-the-art natural language understanding and generation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                AylaAI uses cutting-edge language models to understand context, nuance, and intent
                in your requests. Our AI can generate human-like text, translate languages, write
                different kinds of creative content, and answer your questions in an informative
                way.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                  <span>Contextual understanding that maintains conversation history</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                  <span>Multi-turn dialogue capabilities for natural conversations</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                  <span>Sentiment analysis to understand emotional context</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/docs/ai-capabilities">Learn more about AI capabilities</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-cyan-500" />
                Natural Conversations
              </CardTitle>
              <CardDescription>
                Chat with AylaAI like you would with a human assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Have natural, flowing conversations with AylaAI. Our assistant remembers context
                from previous messages, understands follow-up questions, and provides relevant,
                helpful responses that feel human.
              </p>
              <Button asChild>
                <Link href="/chat">Try the chat experience</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="productivity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-500" />
                Content Generation
              </CardTitle>
              <CardDescription>Create high-quality content for any purpose</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Generate blog posts, marketing copy, emails, social media content, and more with
                simple prompts. AylaAI can adapt to different tones, styles, and formats to match
                your brand voice.
              </p>
              <Button asChild>
                <Link href="/docs/content-generation">Explore content generation</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-500" />
                Workflow Automation
              </CardTitle>
              <CardDescription>Streamline your tasks and save time</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Automate repetitive tasks, schedule content, and integrate with your existing tools.
                AylaAI helps you focus on what matters by handling the routine work.
              </p>
              <Button asChild>
                <Link href="/docs/automation">Learn about automation</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                Third-party Integrations
              </CardTitle>
              <CardDescription>Connect with your favorite tools and services</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                AylaAI integrates seamlessly with popular productivity tools, CRMs, email services,
                and more to fit into your existing workflow.
              </p>
              <Button asChild>
                <Link href="/docs/integrations">View all integrations</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-red-500" />
                Security & Privacy
              </CardTitle>
              <CardDescription>Enterprise-grade security for your data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Your data is protected with end-to-end encryption, strict access controls, and
                compliance with major security standards.
              </p>
              <Button asChild>
                <Link href="/docs/security">Learn about our security</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
