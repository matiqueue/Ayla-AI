import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Reference | Minimal Docs Site',
  description: 'Detailed API reference for our library',
}

export default function ApiReference() {
  return (
    <main className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">API Reference</h1>
      <p className="text-xl mb-4">
        This section provides a detailed reference for the API of our library. You&apos;ll find
        information about available methods, their parameters, and return values.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Client</h2>
      <p className="mb-4">The main class for interacting with our API.</p>
      <h3 className="text-xl font-semibold mt-6 mb-2">Constructor</h3>
      <pre className="bg-muted p-4 rounded-md mb-4">
        <code>{`new Client(config: ClientConfig)`}</code>
      </pre>
      <p className="mb-4">Creates a new instance of the Client class.</p>
      <h4 className="text-lg font-semibold mt-4 mb-2">Parameters</h4>
      <ul className="list-disc list-inside mb-4">
        <li>
          <code>config</code>: An object containing the client configuration
        </li>
      </ul>
      <h3 className="text-xl font-semibold mt-6 mb-2">Methods</h3>
      <h4 className="text-lg font-semibold mt-4 mb-2">doSomething()</h4>
      <pre className="bg-muted p-4 rounded-md mb-4">
        <code>{`async doSomething(): Promise<Result>`}</code>
      </pre>
      <p className="mb-4">Performs an action and returns a result.</p>
      <h4 className="text-lg font-semibold mt-4 mb-2">Returns</h4>
      <p className="mb-4">A Promise that resolves to a Result object.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Types</h2>
      <h3 className="text-xl font-semibold mt-6 mb-2">ClientConfig</h3>
      <pre className="bg-muted p-4 rounded-md mb-4">
        <code>{`interface ClientConfig {
  apiKey: string;
  environment: 'production' | 'development';
}`}</code>
      </pre>
      <h3 className="text-xl font-semibold mt-6 mb-2">Result</h3>
      <pre className="bg-muted p-4 rounded-md mb-4">
        <code>{`interface Result {
  id: string;
  data: any;
  timestamp: number;
}`}</code>
      </pre>
      <p className="mt-4">
        For more detailed information about specific components and their props, please refer to the
        Components section.
      </p>
    </main>
  )
}
