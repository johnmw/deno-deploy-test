// You need to import `h` factory function as Deno Deploy
// uses it instead of `React.createElement`
import { h } from "https://x.lcas.dev/preact@10.5.12/mod.js";
import { renderToString } from "https://x.lcas.dev/preact@10.5.12/ssr.js";

function App() {
  return (
    <html>
      <head>
        <title>Hello from Deno Deploy and TSX</title>
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>
        <h1>Hello world from Deno Deploy</h1>
        <p>Testing TSX and Static Asset Loading (css)</p>
        <a href="https://github.com/johnmw/deno-deploy-test/blob/main/hello-world.tsx">Link to self on Github</a>
      </body>
    </html>
  );
}

// Request Handler

async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url);

  // This is how the server works:
  // 1. A request comes in for a specific asset.
  // 2. We read the asset from the file system.
  // 3. We send the asset back to the client.

  // Check if the request is for style.css.
  if (pathname.startsWith("/style.css")) {
    // Read the style.css file from the file system.
    const file = await Deno.readFile("./style.css");
    // Respond to the request with the style.css file.
    return new Response(file, {
      headers: {
        "content-type": "text/css",
      },
    });
  }
  
  const response = new Response(renderToString(<App />), {
     headers: { "content-type": "text/html; charset=utf-8" },
  });
  return response;
}

// Main Event Listener

addEventListener("fetch", (event) => {  
  event.respondWith(handleRequest(event.request));
});

