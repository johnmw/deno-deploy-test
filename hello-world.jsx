// You need to import `h` factory function as Deno Deploy
// uses it instead of `React.createElement`
import { h } from "https://x.lcas.dev/preact@10.5.12/mod.js";
import { renderToString } from "https://x.lcas.dev/preact@10.5.12/ssr.js";

function App() {
  return (
    <html>
      <head>
        <title>Hello from JSX</title>
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>
        <h1>Hello world from Deno Deploy via Github</h1>
      </body>
    </html>
  );
}

async function handleRequest(request: Request) {
  const response = new Response(renderToString(<App />), {
     headers: { "content-type": "text/html; charset=utf-8" },
  });
  return response;
}


// Original Deno
addEventListener("fetch", (event) => {
  // renderToString generates html string from JSX components.
//   const response = new Response(renderToString(<App />), {
//     headers: { "content-type": "text/html; charset=utf-8" },
//   });

  //event.respondWith(response);
  event.respondWith(handleRequest(event.request));
});


// 
//async function handleRequest(request: Request) {
  //const { pathname } = new URL(request.url);

  // This is how the server works:
  // 1. A request comes in for a specific asset.
  // 2. We read the asset from the file system.
  // 3. We send the asset back to the client.

  // Check if the request is for style.css.
  //   if (pathname.startsWith("/style.css")) {
  //     // Read the style.css file from the file system.
  //     const file = await Deno.readFile("./style.css");
  //     // Respond to the request with the style.css file.
  //     return new Response(file, {
  //       headers: {
  //         "content-type": "text/css",
  //       },
  //     });
  //   }
  
  // renderToString generates html string from JSX components.
  //   const response = new Response(renderToString(<App />), {
  //     headers: { "content-type": "text/html; charset=utf-8" },
  //   });

  //   return response;
  // });

  // addEventListener("fetch", (event: FetchEvent) => {
  //   event.respondWith(handleRequest(event.request));
  // });
