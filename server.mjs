import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDirectory = path.join(__dirname, "dist");
const host = process.env.HOST || "0.0.0.0";
const port = Number.parseInt(process.env.PORT || "10000", 10);

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".ico", "image/x-icon"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
  [".mp4", "video/mp4"],
  [".webm", "video/webm"],
]);

function sendText(response, statusCode, body, contentType = "text/plain; charset=utf-8") {
  response.writeHead(statusCode, {
    "Content-Type": contentType,
    "Content-Length": Buffer.byteLength(body),
  });
  response.end(body);
}

function safeFilePath(urlPathname) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(urlPathname);
  } catch {
    return null;
  }

  const resolvedPath = path.resolve(distDirectory, `.${decodedPath}`);
  if (resolvedPath !== distDirectory && !resolvedPath.startsWith(`${distDirectory}${path.sep}`)) {
    return null;
  }
  return resolvedPath;
}

async function serveFile(request, response, filePath, fileStats) {
  const extension = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes.get(extension) || "application/octet-stream";
  const isHashedAsset = filePath.includes(`${path.sep}assets${path.sep}`);
  const cacheControl = extension === ".html"
    ? "no-cache"
    : isHashedAsset
      ? "public, max-age=31536000, immutable"
      : "public, max-age=3600";

  const rangeHeader = request.headers.range;
  if (rangeHeader && fileStats.size > 0) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader);
    if (!match) {
      response.writeHead(416, { "Content-Range": `bytes */${fileStats.size}` });
      response.end();
      return;
    }

    let start = match[1] ? Number.parseInt(match[1], 10) : 0;
    let end = match[2] ? Number.parseInt(match[2], 10) : fileStats.size - 1;

    if (!match[1] && match[2]) {
      const suffixLength = Number.parseInt(match[2], 10);
      start = Math.max(fileStats.size - suffixLength, 0);
      end = fileStats.size - 1;
    }

    if (start > end || start >= fileStats.size) {
      response.writeHead(416, { "Content-Range": `bytes */${fileStats.size}` });
      response.end();
      return;
    }

    end = Math.min(end, fileStats.size - 1);
    const chunkSize = end - start + 1;
    response.writeHead(206, {
      "Accept-Ranges": "bytes",
      "Cache-Control": cacheControl,
      "Content-Type": contentType,
      "Content-Length": chunkSize,
      "Content-Range": `bytes ${start}-${end}/${fileStats.size}`,
    });

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    createReadStream(filePath, { start, end }).pipe(response);
    return;
  }

  response.writeHead(200, {
    "Accept-Ranges": "bytes",
    "Cache-Control": cacheControl,
    "Content-Type": contentType,
    "Content-Length": fileStats.size,
  });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
}

const server = createServer(async (request, response) => {
  try {
    if (request.method !== "GET" && request.method !== "HEAD") {
      sendText(response, 405, "Method Not Allowed");
      return;
    }

    const requestUrl = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

    if (requestUrl.pathname === "/healthz") {
      sendText(response, 200, JSON.stringify({ status: "ok" }), "application/json; charset=utf-8");
      return;
    }

    let filePath = safeFilePath(requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname);
    if (!filePath) {
      sendText(response, 400, "Bad Request");
      return;
    }

    let fileStats;
    try {
      fileStats = await stat(filePath);
      if (fileStats.isDirectory()) {
        filePath = path.join(filePath, "index.html");
        fileStats = await stat(filePath);
      }
    } catch {
      const acceptsHtml = request.headers.accept?.includes("text/html");
      if (!acceptsHtml) {
        sendText(response, 404, "Not Found");
        return;
      }

      filePath = path.join(distDirectory, "index.html");
      fileStats = await stat(filePath);
    }

    await serveFile(request, response, filePath, fileStats);
  } catch (error) {
    console.error(error);
    if (!response.headersSent) {
      sendText(response, 500, "Internal Server Error");
    } else {
      response.destroy();
    }
  }
});

server.listen(port, host, () => {
  console.log(`CORE Fitness web service listening on http://${host}:${port}`);
});

function shutdown(signal) {
  console.log(`${signal} received; shutting down.`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
