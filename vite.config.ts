import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { defineConfig } from 'vite'
import { remixDevTools } from 'remix-development-tools'
import tsconfigPaths from 'vite-tsconfig-paths'
import { vercelPreset } from '@vercel/remix/vite'
import { flatRoutes } from 'remix-flat-routes'

installGlobals()

export default defineConfig({
  plugins: [remixDevTools(), remix({ 
    ignoredRouteFiles: ['**/*'],
    routes: async defineRoutes => {
      return flatRoutes('routes', defineRoutes, {
        ignoredRouteFiles: [
          '.*',
          '**/*.css',
          '**/*.test.{js,ts,jsx,tsx}',
          '**/__*.*',
          // This is for server-side utilities you want to colocate
          // next to your routes without making an additional
          // directory. If you need a route that includes "server" or
          // "client" in the filename, use the escape brackets like:
          // my-route.[server].tsx
          '**/*.server.*',
          '**/*.client.*',
        ]
      })
    },
    presets: [vercelPreset()] }), tsconfigPaths()],
  server: {
    open: true,
    port: 3000,
  },
})
