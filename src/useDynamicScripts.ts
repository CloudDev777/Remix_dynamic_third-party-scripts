import { useEffect } from "react";

// Track injected scripts globally
const injectedScripts = new Set<string>();

/**
 * Dynamically injects JavaScript code into the <head> section of the document.
 *
 * @param providerScripts - An array of strings where each string contains a provider's JavaScript code.
 *
 * This hook adds the script content to the document on mount and cleans it up on unmount.
 */
export function useDynamicScripts(providerScripts: string[]): void {
  useEffect(() => {
    providerScripts.forEach((scriptContent) => {
      if (!scriptContent || injectedScripts.has(scriptContent)) {
        // Skip empty or already-injected scripts
        return;
      }

      const script = document.createElement("script");
      script.setAttribute(
        "id",
        `ac-dynamic-script-${injectedScripts.size + 1}`
      );
      script.type = "text/javascript";
      script.async = true;
      script.text = scriptContent; // Set the script content
      document.head.appendChild(script); // Append it to the <head>
    });

    // Cleanup: Remove scripts when the component unmounts
    return () => {
      providerScripts.forEach((_, index) => {
        const script = document.head.querySelector(
          `script[data-dynamic="true"]:nth-of-type(${index + 1})`
        );
        if (script) script.remove();
      });
    };
  }, [providerScripts]);
}
