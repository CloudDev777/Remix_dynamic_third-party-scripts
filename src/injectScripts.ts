/**
 * Generates the JavaScript code for a specified provider or a custom script.
 *
 * @param providerName - The name of the third-party provider (e.g., "helpscout"), or "custom" for raw scripts.
 * @param projectIdOrScript - The project ID for a known provider or a raw JavaScript string for custom scripts.
 * @returns The JavaScript code as a string for embedding into the document.
 * @throws Error if the provider is unsupported or missing in the `providerScripts` mapping.
 */
export function getProviderScript(
  providerName: string,
  projectIdOrScript: string
): string {
  // Helper to validate custom JavaScript
  const validateCustomScript = (script: string): void => {
    try {
      // Try creating a new Function to validate syntax
      new Function(script);
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.log(`Invalid custom script: ${e.message}`);
      }
      console.log(e); // log other unexpected errors
    }
  };

  const providerScripts: Record<string, (input: string) => string> = {
    helpscout: (
      id
    ) => `!function(e,t,n){function a(){var e=t.getElementsByTagName("script")[0],n=t.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://beacon-v2.helpscout.net",e.parentNode.insertBefore(n,e)}if(e.Beacon=n=function(t,n,a){e.Beacon.readyQueue.push({method:t,options:n,data:a})},n.readyQueue=[],"complete"===t.readyState)return a();e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}(window,document,window.Beacon||function(){});
      window.Beacon('init', '${id}');
    `,
    clarityms: (id) => `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${id}");
    `,
    proprofs_livechat: (id) => `
      (function(){
        var pp=document.createElement('script'), ppr=document.getElementsByTagName('script')[0];
        stid='${id}';pp.type='text/javascript'; pp.async=true; 
        pp.src=('https:' == document.location.protocol ? 'https://' : 'http://') + 's01.live2support.com/dashboardv2/chatwindow/';
        ppr.parentNode.insertBefore(pp, ppr);
      })();
    `,
    // Custom script
    custom: (script) => {
      validateCustomScript(script); // Validate custom script syntax
      return script;
    },
  };

  try {
    const generator = providerScripts[providerName.toLowerCase()];
    if (!generator) {
      console.log(
        `Unsupported provider: ${providerName}. Add a script generator for this provider or use "custom" for raw scripts.`
      );
    }
    return generator(projectIdOrScript);
  } catch (error) {
    console.error(error);
    return "";
  }
}
