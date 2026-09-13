#!/usr/bin/env node
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const here = (path) => fileURLToPath(new URL(path, import.meta.url));
const pages = process.argv.includes("--pages");

function run(script, env) {
  const child = spawn(process.execPath, [here(script)], {
    stdio: "inherit", env: { ...process.env, ...env },
  });
  return new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", (code) => resolve(code ?? 1));
  });
}

async function availablePort() {
  const probe = createServer();
  await new Promise((resolve, reject) => {
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", resolve);
  });
  const port = probe.address().port;
  await new Promise((resolve) => probe.close(resolve));
  return port;
}

async function startRuntime() {
  const port = await availablePort();
  const base = `http://127.0.0.1:${port}`;
  if (!pages) {
    // The CLI may auto-daemonize in agent environments. The API gives this
    // harness ownership of the server, without touching a user's dev lockfile.
    const { preview } = await import("astro");
    const server = await preview({ server: { host: "127.0.0.1", port }, logLevel: "error" });
    return { base: `http://127.0.0.1:${server.port}`, stop: () => server.stop() };
  }
  const server = spawn(process.execPath, [here("../../node_modules/wrangler/bin/wrangler.js"), "pages", "dev", "dist", "--ip", "127.0.0.1", "--port", String(port), "--inspector-port", "0"], {
    stdio: ["ignore", "pipe", "pipe"],
    detached: process.platform !== "win32",
    env: { ...process.env, WRANGLER_SEND_METRICS: "false" },
  });
  let output = "";
  let startupError;
  server.on("error", (error) => { startupError = error; });
  server.stdout.on("data", (chunk) => { output = (output + chunk).slice(-8000); });
  server.stderr.on("data", (chunk) => { output = (output + chunk).slice(-8000); });
  const stopped = new Promise((resolve) => server.once("close", resolve));
  function signal(value) {
    if (!server.pid) return;
    try {
      if (process.platform === "win32") server.kill(value);
      else process.kill(-server.pid, value);
    } catch (error) { if (error.code !== "ESRCH") throw error; }
  }
  async function stop() {
    signal("SIGTERM");
    const timeout = setTimeout(() => signal("SIGKILL"), 3000);
    await stopped;
    clearTimeout(timeout);
  }
  try {
    const deadline = Date.now() + 30000;
    while (true) {
      if (startupError) throw startupError;
      if (server.exitCode !== null || Date.now() > deadline) throw new Error(`Pages preview did not start. Run npm run build first.\n${output}`);
      try {
        const response = await fetch(base, { signal: AbortSignal.timeout(1000) });
        await response.body?.cancel();
        if (response.ok) break;
      } catch { /* wait for readiness */ }
      await delay(200);
    }
    return { base, stop };
  } catch (error) {
    await stop();
    throw error;
  }
}

const runtime = process.env.E2E_BASE
  ? { base: process.env.E2E_BASE, stop: async () => {} }
  : await startRuntime();
try {
  process.exitCode = await run("./e2e.mjs", { E2E_BASE: runtime.base });
  if (pages && process.exitCode === 0) {
    process.exitCode = await run("./verify-host.mjs", { HARNESS_BASE: runtime.base, HARNESS_ZH_SPLAT: "1" });
  }
} finally {
  await runtime.stop();
}
