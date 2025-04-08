import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Code, FileText, MessageSquare, Settings } from 'lucide-react'
import Link from 'next/link'

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Documentation</h1>
        <p className="text-lg text-muted-foreground">
          Everything you need to know about using AylaAI effectively.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Browse by category</CardDescription>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <Link
                  href="#getting-started"
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Getting Started</span>
                </Link>
                <Link
                  href="#api-reference"
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <Code className="h-5 w-5" />
                  <span>API Reference</span>
                </Link>
                <Link
                  href="#guides"
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <FileText className="h-5 w-5" />
                  <span>Guides</span>
                </Link>
                <Link
                  href="#chat-examples"
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Chat Examples</span>
                </Link>
                <Link
                  href="#configuration"
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  <span>Configuration</span>
                </Link>
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <section id="getting-started" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="mb-4">
                  Welcome to AylaAI! This guide will help you get up and running quickly with our AI
                  assistant.
                </p>
                <h3 className="text-lg font-medium mb-2">Quick Start</h3>
                <ol className="list-decimal list-inside space-y-2 mb-4">
                  <li>Create an account or sign in</li>
                  <li>Set up your preferences</li>
                  <li>Start a conversation with AylaAI</li>
                  <li>Explore features and capabilities</li>
                </ol>
                <p>
                  For more detailed instructions, check out our{' '}
                  <Link href="/docs/quick-start" className="text-purple-500 hover:underline">
                    comprehensive quick start guide
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="api-reference" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">API Reference</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="mb-4">Integrate AylaAI into your applications with our robust API.</p>
                <Tabs defaultValue="rest">
                  <TabsList>
                    <TabsTrigger value="rest">REST API</TabsTrigger>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                  </TabsList>
                  <TabsContent value="rest" className="mt-4">
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                      <code>{`POST /api/v1/chat
Content-Type: application/json

{
  "message": "Hello, AylaAI!",
  "context": "previous_conversation_id"
}`}</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="javascript" className="mt-4">
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                      <code>{`import { AylaAI } from '@ayla-ai/sdk';

const ayla = new AylaAI('YOUR_API_KEY');

async function chat() {
  const response = await ayla.chat({
    message: "Hello, AylaAI!",
    context: "previous_conversation_id"
  });
  
  console.log(response.message);
}`}</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="python" className="mt-4">
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                      <code>{`from ayla_ai import AylaAI

ayla = AylaAI('YOUR_API_KEY')

response = ayla.chat(
    message="Hello, AylaAI!",
    context="previous_conversation_id"
)

print(response.message)`}</code>
                    </pre>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
