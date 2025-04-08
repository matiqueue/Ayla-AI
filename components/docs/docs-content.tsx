'use client'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/docs/code-block'

export function DocsContent() {
  return (
    <div className="container max-w-4xl py-8 md:py-12 px-4 md:px-6">
      <div className="grid gap-10">
        <section id="introduction" className="grid gap-5">
          <div>
            <Badge variant="outline" className="mb-2">
              Documentation
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-3">Introduction</h1>
            <p className="text-xl text-muted-foreground">
              Welcome to our comprehensive documentation. This guide will help you understand our
              platform and get the most out of its features.
            </p>
          </div>

          <Alert>
            <AlertTitle>New Version Available</AlertTitle>
            <AlertDescription>
              We&apos;ve released version 2.0 with exciting new features. Check out the{' '}
              <a href="#" className="font-medium underline underline-offset-4">
                release notes
              </a>
              .
            </AlertDescription>
          </Alert>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Start</CardTitle>
                <CardDescription>Get up and running in minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Follow our quick start guide to integrate the platform into your application with
                  minimal setup.
                </p>
                <Button variant="default" size="sm" asChild>
                  <a href="#quick-start">Get Started →</a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Reference</CardTitle>
                <CardDescription>Explore the API documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse our comprehensive API reference for detailed information about endpoints
                  and parameters.
                </p>
                <Button variant="default" size="sm" asChild>
                  <a href="#endpoints">View API →</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="installation" className="grid gap-5">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-3">Installation</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Follow these steps to install and set up our platform in your environment.
            </p>
          </div>

          <div className="rounded-lg border">
            <Tabs defaultValue="npm">
              <div className="flex items-center justify-between border-b px-4">
                <TabsList className="h-12">
                  <TabsTrigger value="npm">npm</TabsTrigger>
                  <TabsTrigger value="yarn">yarn</TabsTrigger>
                  <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="npm" className="p-0">
                <CodeBlock>npm install @acme/platform</CodeBlock>
              </TabsContent>
              <TabsContent value="yarn" className="p-0">
                <CodeBlock>yarn add @acme/platform</CodeBlock>
              </TabsContent>
              <TabsContent value="pnpm" className="p-0">
                <CodeBlock>pnpm add @acme/platform</CodeBlock>
              </TabsContent>
            </Tabs>
          </div>

          <p className="text-muted-foreground">
            After installation, you can import the components and start using them in your project.
          </p>

          <CodeBlock title="Example Usage">
            {`import { Platform } from '@acme/platform';

function App() {
  return (
    <Platform
      apiKey="your-api-key"
      options={{
        theme: 'light',
        debug: false
      }}
    >
      <YourApp />
    </Platform>
  );
}`}
          </CodeBlock>
        </section>

        <section id="quick-start" className="grid gap-5">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-3">Quick Start</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Get up and running with our platform in just a few minutes.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-muted">
                <span className="text-sm font-medium">1</span>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-semibold">Sign up for an account</h3>
                <p className="text-muted-foreground">
                  Create an account on our platform to get your API key.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-muted">
                <span className="text-sm font-medium">2</span>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-semibold">Install the SDK</h3>
                <p className="text-muted-foreground">
                  Install our SDK using your preferred package manager.
                </p>
                <CodeBlock>npm install @acme/platform</CodeBlock>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-muted">
                <span className="text-sm font-medium">3</span>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-semibold">Initialize the SDK</h3>
                <p className="text-muted-foreground">Initialize the SDK with your API key.</p>
                <CodeBlock>
                  {`import { initPlatform } from '@acme/platform';

initPlatform({
  apiKey: 'your-api-key',
  environment: 'production'
});`}
                </CodeBlock>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-muted">
                <span className="text-sm font-medium">4</span>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-semibold">Make your first API call</h3>
                <p className="text-muted-foreground">
                  Start using the platform by making your first API call.
                </p>
                <CodeBlock>
                  {`import { Platform } from '@acme/platform';

async function getUser() {
  try {
    const user = await Platform.users.get('user-id');
    console.log(user);
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}`}
                </CodeBlock>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="grid gap-5">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-3">Features</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our platform offers a wide range of features to help you build powerful applications.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get instant updates and notifications for your application with our WebSocket
                  integration.
                </p>
                <CodeBlock title="WebSocket Example">
                  {`import { Platform } from '@acme/platform';

const socket = Platform.createSocket();

socket.on('update', (data) => {
  console.log('New update:', data);
});

socket.connect();`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track user behavior and application performance with detailed analytics.
                </p>
                <CodeBlock title="Analytics Example">
                  {`import { Platform } from '@acme/platform';

// Track a custom event
Platform.analytics.track('purchase_completed', {
  productId: 'prod_123',
  amount: 49.99,
  currency: 'USD'
});`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customizable UI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Tailor the user interface to match your brand and requirements with our theming
                  system.
                </p>
                <CodeBlock title="Theming Example">
                  {`import { Platform, createTheme } from '@acme/platform';

const customTheme = createTheme({
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#f8f9fa'
  },
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Poppins, sans-serif'
  }
});

Platform.setTheme(customTheme);`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Secure Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Implement robust authentication and authorization mechanisms with our auth system.
                </p>
                <CodeBlock title="Authentication Example">
                  {`import { Platform } from '@acme/platform';

// Sign in a user
const user = await Platform.auth.signIn({
  email: 'user@example.com',
  password: 'secure-password'
});

// Get the current user
const currentUser = Platform.auth.getCurrentUser();

// Sign out
await Platform.auth.signOut();`}
                </CodeBlock>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="architecture" className="grid gap-5">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-3">Architecture</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Understanding the architecture of our platform will help you integrate it effectively.
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <div className="grid gap-4">
              <div className="rounded-lg bg-accent p-4">
                <h4 className="font-medium">Client Layer</h4>
                <p className="text-sm text-muted-foreground">
                  Handles user interactions and UI rendering
                </p>
                <ul className="mt-2 text-sm list-disc list-inside">
                  <li>React/Vue/Angular Components</li>
                  <li>State Management</li>
                  <li>UI Rendering</li>
                </ul>
              </div>
              <div className="flex justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
              </div>
              <div className="rounded-lg bg-accent p-4">
                <h4 className="font-medium">API Layer</h4>
                <p className="text-sm text-muted-foreground">
                  Processes requests and manages data flow
                </p>
                <ul className="mt-2 text-sm list-disc list-inside">
                  <li>RESTful Endpoints</li>
                  <li>WebSocket Connections</li>
                  <li>Authentication & Authorization</li>
                </ul>
              </div>
              <div className="flex justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
              </div>
              <div className="rounded-lg bg-accent p-4">
                <h4 className="font-medium">Data Layer</h4>
                <p className="text-sm text-muted-foreground">
                  Stores and retrieves application data
                </p>
                <ul className="mt-2 text-sm list-disc list-inside">
                  <li>Database Operations</li>
                  <li>Caching</li>
                  <li>Data Processing</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground mt-4">
            Our platform follows a layered architecture pattern, separating concerns between the
            client, API, and data layers. This separation allows for better maintainability,
            scalability, and flexibility.
          </p>
        </section>

        <section id="authentication" className="grid gap-5">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-3">Authentication</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Learn how to authenticate your requests to our API.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>API Key Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The simplest way to authenticate is using your API key. Include it in the
                  Authorization header of your requests.
                </p>
                <CodeBlock title="API Key Example">
                  {`curl -X GET "https://api.example.com/v1/users" \\
  -H "Authorization: Bearer your-api-key"`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>OAuth 2.0</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  For more secure applications, we support OAuth 2.0 authentication.
                </p>
                <CodeBlock title="OAuth Example">
                  {`import { Platform } from '@acme/platform';

// Initialize OAuth
Platform.auth.initOAuth({
  clientId: 'your-client-id',
  redirectUri: 'https://your-app.com/callback'
});

// Start the OAuth flow
Platform.auth.authorize();

// Handle the callback
async function handleCallback(code) {
  const tokens = await Platform.auth.getTokens(code);
  // Store tokens securely
}`}
                </CodeBlock>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="endpoints" className="grid gap-5">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-3">API Endpoints</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Detailed documentation for all API endpoints and methods.
            </p>
          </div>

          <div className="rounded-lg border">
            <div className="border-b p-4 bg-muted/50">
              <div className="flex items-center">
                <Badge className="mr-2">GET</Badge>
                <h3 className="font-semibold">/api/v1/users</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Retrieve a list of users with optional filtering.
              </p>
            </div>
            <div className="p-4 border-b">
              <h4 className="text-sm font-medium mb-2">Parameters</h4>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="font-medium">page</div>
                  <div>number</div>
                  <div className="text-muted-foreground">
                    Page number for pagination (default: 1)
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="font-medium">limit</div>
                  <div>number</div>
                  <div className="text-muted-foreground">
                    Number of items per page (default: 10, max: 100)
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="font-medium">filter</div>
                  <div>string</div>
                  <div className="text-muted-foreground">
                    Filter criteria (e.g., &quot;status:active&quot;)
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-sm font-medium mb-2">Response</h4>
              <CodeBlock title="Example Response">
                {`{
  "data": [
    {
      "id": "user_1",
      "name": "John Doe",
      "email": "john@example.com",
      "status": "active",
      "created_at": "2023-01-15T08:30:00Z"
    },
    {
      "id": "user_2",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "status": "active",
      "created_at": "2023-02-20T14:15:00Z"
    }
  ],
  "meta": {
    "total": 42,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="rounded-lg border mt-6">
            <div className="border-b p-4 bg-muted/50">
              <div className="flex items-center">
                <Badge className="mr-2" variant="destructive">
                  POST
                </Badge>
                <h3 className="font-semibold">/api/v1/users</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Create a new user.</p>
            </div>
            <div className="p-4 border-b">
              <h4 className="text-sm font-medium mb-2">Request Body</h4>
              <CodeBlock title="Example Request">
                {`{
  "name": "New User",
  "email": "newuser@example.com",
  "role": "user",
  "metadata": {
    "company": "Acme Inc",
    "department": "Engineering"
  }
}`}
              </CodeBlock>
            </div>
            <div className="p-4">
              <h4 className="text-sm font-medium mb-2">Response</h4>
              <CodeBlock title="Example Response">
                {`{
  "id": "user_3",
  "name": "New User",
  "email": "newuser@example.com",
  "role": "user",
  "status": "active",
  "metadata": {
    "company": "Acme Inc",
    "department": "Engineering"
  },
  "created_at": "2023-04-10T09:45:00Z"
}`}
              </CodeBlock>
            </div>
          </div>
        </section>

        <section id="faq" className="grid gap-5">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-3">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Find answers to common questions about our platform.
            </p>
          </div>

          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>How do I reset my API key?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You can reset your API key from the dashboard by navigating to Settings → API Keys
                  and clicking the &quot;Reset&quot; button. Note that this will invalidate your
                  current key immediately, so make sure to update any applications using the old
                  key.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What are the rate limits?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Rate limits vary by plan tier. Free tier accounts have a limit of 60 requests per
                  minute and 10,000 requests per day. See the{' '}
                  <a href="#rate-limits" className="font-medium underline underline-offset-4">
                    Rate Limits
                  </a>{' '}
                  section for more details.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How do I report a bug?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You can report bugs through our GitHub repository by opening an issue or by
                  contacting our support team at support@example.com. Please include as much detail
                  as possible, including steps to reproduce the issue, expected behavior, and actual
                  behavior.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Do you offer a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Yes, we offer a 14-day free trial of our Pro plan with no credit card required.
                  You can sign up for the trial on our website. After the trial period, you can
                  choose to upgrade to a paid plan or continue with the free tier.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How do I upgrade my plan?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You can upgrade your plan at any time from the dashboard by navigating to Settings
                  → Billing and selecting the plan that best fits your needs. Plan changes take
                  effect immediately, and you&apos;ll be charged a prorated amount for the remainder
                  of your billing cycle.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
