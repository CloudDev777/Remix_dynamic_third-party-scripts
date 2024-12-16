# AC Remix Dynamic Script Injector

A lightweight utility package for Remix and other React applications that allows you to dynamically inject JavaScript snippets for third-party providers such as Helpscout, Clarity, and ProProfs Live Chat.

You can also inject `custom script` snippets.

## Features

- Dynamically inject JavaScript scripts into the DOM at runtime.
- Supports multiple third-party providers.
- Automatically handles script lifecycle (e.g., injection and cleanup).
- Validates the custom scripts to prevent invalid or syntactically incorrect scripts from being injected into the DOM.

## Installation

Install the package using npm or yarn:

```bash
npm install ac-remix-dynamic-scripts

# or

yarn add ac-remix-dynamic-scripts
```

## Usage

### Injecting Scripts Dynamically

Use the `getProviderScript` function to generate the JavaScript snippet for a specific provider and the `useDynamicScripts` hook to inject it into your React application.

**Example:** Single pre-defined provider

```tsx
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getProviderScript, useDynamicScripts } from "ac-remix-dynamic-scripts";

export async function loader({ request }: LoaderFunctionArgs) {
  const scripts = [getProviderScript("helpscout", "your-helpscout-project-id")];

  return { scripts };
}

const App = () => {
  const { scripts } = useLoaderData<typeof loader>();

  useDynamicScripts(scripts);

  return <div className="App-component">Test content</div>;
};

export default App;
```

**Example**: Multiple pre-defined providers with a custom snippet

```tsx
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getProviderScript, useDynamicScripts } from "ac-remix-dynamic-scripts";

export async function loader({ request }: LoaderFunctionArgs) {
  const providers = [
    { name: "helpscout", projectIdOrScript: "your-helpscout-id" },
    { name: "clarityms", projectIdOrScript: "your-clarityms-id" },
    {
      name: "custom",
      projectIdOrScript: `
        console.log("This is a custom script!");
      `,
    },
  ];

  const generatedScripts = providers.map((provider) =>
    getProviderScript(provider.name, provider.projectIdOrScript)
  );

  return { generatedScripts };
}

const App = () => {
  const { generatedScripts } = useLoaderData<typeof loader>();

  useDynamicScripts(generatedScripts);

  return <div className="App-component">Test content</div>;
};

export default App;
```

## Supported Providers

The following providers are supported out-of-the-box:

- **Helpscout**

  Example:

  ```typescript
  getProviderScript("helpscout", "your-helpscout-project-id");
  ```

- **Clarity**

  Example:

  ```typescript
  getProviderScript("clarityms", "your-clarity-tracking-id");
  ```

- **ProProfs Live Chat**

  Example:

  ```typescript
  getProviderScript("proprofs_livechat", "your-proprofs-live-chat-id");
  ```

### Injecting Custom Scripts

If you need to inject a custom JavaScript snippet that is not tied to a specific provider, you can use the `"custom"` option:

```tsx
import { getProviderScript, useDynamicScripts } from "ac-remix-dynamic-scripts";

export default function App() {
  const customScript = `
    console.log("This is a custom script!");
  `;

  const scripts = [getProviderScript("custom", customScript)];

  useDynamicScripts(scripts);

  return <div>Your App Content</div>;
}
```

This approach allows you to inject any JavaScript code into your application dynamically.

## API Reference

`getProviderScript(providerName: string, projectIdOrScript: string): string`
Generates a JavaScript snippet for the specified third-party provider.

- **Parameters:**

  - `providerName` (string): The name of the provider (`"helpscout"`, `"clarityms"`, etc.) or `"custom"` for raw JavaScript.
  - `projectIdOrScript` (string): The project ID (for known providers) or the raw JavaScript string (for custom scripts).

- **Returns:** A JavaScript snippet as a string.

- **Example:** Inject a custom JavaScript snippet:

  ```typescript
  const script = getProviderScript("custom", "console.log('Hello World');");
  ```

`useDynamicScripts(providerScripts: string[]): void`
Injects the provided JavaScript snippets into the document <head> dynamically.

- **Parameters:**

  - `providerScripts` (string[]): An array of JavaScript snippets.

- **Usage:**

  ```tsx
  const scripts = [getProviderScript("helpscout", "your-project-id")];
  useDynamicScripts(scripts);
  ```

## Contributing

We welcome contributions! If you find a bug or have a feature request, please open an issue or submit a pull request.

- Clone the repository:

  ```bash
  git clone https://github.com/abdullahceylan/ac-remix-dynamic-scripts.git
  ```

- Install dependencies:
  ```bash
  yarn install
  ```
