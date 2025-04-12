import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Getting Started | Minimal Docs Site',
  description: 'Learn how to get started with our documentation',
}

export default function GettingStarted() {
  return (
    <main className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Getting Started</h1>
      <p className="text-xl mb-4">
        Welcome to the getting started guide for our documentation site. Follow these steps to set
        up your environment and begin using our tools.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Installation</h2>
      <p className="mb-4">To install our package, run the following command in your terminal:</p>
      <pre className="bg-muted p-4 rounded-md mb-4">
        <code>npm install @our-company/package</code>
      </pre>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Configuration</h2>
      <p className="mb-4">
        After installation, you need to set up the configuration file. Create a file named{' '}
        <code>config.js</code> in your project root and add the following content:
      </p>
      <pre className="bg-muted p-4 rounded-md mb-4">
        <code>{`module.exports = {
  apiKey: 'YOUR_API_KEY',
  environment: 'production'
}`}</code>
      </pre>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Usage</h2>
      <p className="mb-4">Here&apos;s a basic example of how to use our package in your project:</p>
      <pre className="bg-muted p-4 rounded-md mb-4">
        <code>{`import { Client } from '@our-company/package';

const client = new Client();
const result = await client.doSomething();
console.log(result);`}</code>
      </pre>
      <p className="mt-4">
        For more detailed information, please check out our Components and API Reference sections.
      </p>
    </main>
  )
}
