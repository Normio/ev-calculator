import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import { remixDevTools } from "remix-development-tools";
import tsconfigPaths from "vite-tsconfig-paths";
import { vercelPreset } from "@vercel/remix/vite";

installGlobals();

export default defineConfig({
  plugins: [
    remixDevTools(),
    remix({ presets: [vercelPreset()] }),
    tsconfigPaths(),
  ],
  server: {
    open: true,
    port: 3000,
  },
});
