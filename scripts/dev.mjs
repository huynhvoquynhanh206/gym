import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const viteCli = fileURLToPath(new URL("../node_modules/vite/bin/vite.js", import.meta.url));

const children = [
  spawn(process.execPath, ["--watch", "server/index.mjs"], { stdio: "inherit", env: { ...process.env, PORT: "8787" } }),
  spawn(process.execPath, [viteCli, "--host", "0.0.0.0"], { stdio: "inherit" }),
];

const stop = (signal = "SIGTERM") => {
  for (const child of children) child.kill(signal);
};

process.on("SIGINT", () => { stop("SIGINT"); process.exit(0); });
process.on("SIGTERM", () => { stop("SIGTERM"); process.exit(0); });

for (const child of children) {
  child.on("error", (error) => {
    console.error(`Unable to start development process: ${error.message}`);
    stop();
    process.exit(1);
  });

  child.on("exit", (code) => {
    if (code && code !== 0) {
      stop();
      process.exit(code);
    }
  });
}
