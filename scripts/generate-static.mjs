import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const indexPath = path.join(distDir, "index.html");

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function generateStaticHtml() {
  console.log("[generate-static] Generating static index.html and distribution folder...");

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Copy .output/public into dist
  const outputPublic = path.join(rootDir, ".output", "public");
  if (fs.existsSync(outputPublic)) {
    console.log("[generate-static] Copying .output/public to dist...");
    copyDirRecursive(outputPublic, distDir);
  }

  // Copy public/ into dist
  const publicDir = path.join(rootDir, "public");
  if (fs.existsSync(publicDir)) {
    console.log("[generate-static] Copying public/ to dist...");
    copyDirRecursive(publicDir, distDir);
  }

  // Strategy 1: Render via SSR service bundle built by Vite/Nitro
  const ssrPath = path.join(rootDir, "node_modules", ".nitro", "vite", "services", "ssr", "index.js");
  if (fs.existsSync(ssrPath)) {
    try {
      console.log(`[generate-static] Found SSR service bundle at ${ssrPath}`);
      const ssrModule = await import(pathToFileURL(ssrPath).href);
      if (typeof ssrModule.default?.fetch === "function") {
        const response = await ssrModule.default.fetch(new Request("http://localhost/"));
        if (response.status === 200) {
          const html = await response.text();
          if (html.includes("<html") && html.includes("</html>")) {
            fs.writeFileSync(indexPath, html, "utf8");
            if (fs.existsSync(outputPublic)) {
              fs.writeFileSync(path.join(outputPublic, "index.html"), html, "utf8");
            }
            console.log(`[generate-static] Successfully generated static index.html via SSR (${html.length} bytes)`);
            return;
          }
        }
      }
    } catch (err) {
      console.warn("[generate-static] SSR render failed, falling back to client SPA template:", err);
    }
  }

  // Strategy 2: Client SPA template fallback
  console.log("[generate-static] Building client SPA index.html fallback...");
  const assetsDir = path.join(distDir, "assets");
  let cssFiles = [];
  let jsFiles = [];

  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    cssFiles = files.filter((f) => f.endsWith(".css"));
    jsFiles = files.filter((f) => f.startsWith("index-") && f.endsWith(".js"));
    if (jsFiles.length === 0) {
      jsFiles = files.filter((f) => f.endsWith(".js"));
    }
  }

  const cssTags = cssFiles.map((file) => `<link rel="stylesheet" href="/assets/${file}" />`).join("\n    ");
  const jsTags = jsFiles.map((file) => `<script type="module" src="/assets/${file}"></script>`).join("\n    ");

  const fallbackHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Vasu &amp; Manisha — Wedding Invitation | 21st – 22nd November 2026</title>
    <meta name="description" content="Together with our families, we invite you to the union of Vasu &amp; Manisha. Join us to celebrate at RPN Resort &amp; Cafe, Dehradun, Uttarakhand on 21st – 22nd November 2026." />
    <meta property="og:site_name" content="Vasu &amp; Manisha Wedding Invitation" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Vasu &amp; Manisha — Wedding Invitation | 21st – 22nd November 2026" />
    <meta property="og:description" content="Together with our families, we invite you to the union of Vasu &amp; Manisha. Join us to celebrate at RPN Resort &amp; Cafe, Dehradun, Uttarakhand on 21st – 22nd November 2026." />
    <meta property="og:image" content="/og-image.jpg" />
    <meta property="og:image:secure_url" content="/og-image.jpg" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Vasu &amp; Manisha — Wedding Invitation · 21st – 22nd November 2026" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Vasu &amp; Manisha — Wedding Invitation" />
    <meta name="twitter:description" content="Together with our families, we invite you to the union of Vasu &amp; Manisha on 21st – 22nd November 2026 at RPN Resort &amp; Cafe, Dehradun, Uttarakhand." />
    <meta name="twitter:image" content="/og-image.jpg" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&amp;family=Jost:wght@300;400;500&amp;family=Petit+Formal+Script&amp;display=swap" />
    ${cssTags}
  </head>
  <body>
    <div id="root"></div>
    ${jsTags}
  </body>
</html>`;

  fs.writeFileSync(indexPath, fallbackHtml, "utf8");
  if (fs.existsSync(outputPublic)) {
    fs.writeFileSync(path.join(outputPublic, "index.html"), fallbackHtml, "utf8");
  }
  console.log(`[generate-static] Successfully wrote fallback index.html (${fallbackHtml.length} bytes)`);
}

generateStaticHtml().catch((err) => {
  console.error("[generate-static] Fatal error generating index.html:", err);
  process.exit(1);
});
