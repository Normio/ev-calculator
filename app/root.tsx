import { LoaderFunctionArgs, json } from '@remix-run/node'
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'
import { useSupabase } from '~/lib/supabase'
import { createServerClient } from '~/lib/supabase.server'

import './styles/tailwind.css'
import { User } from '@supabase/supabase-js'

const getURL = () => {
  let url =
    process?.env?.SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/'
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  return url
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // environment variables may be stored somewhere other than
  // `process.env` in runtimes other than node
  // we need to pipe these Supabase environment variables to the browser
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
    SITE_ROOT_URL: getURL(),
  }

  // We can retrieve the session on the server and hand it to the client.
  // This is used to make sure the session is available immediately upon rendering
  const { supabase, headers } = createServerClient(request)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {data: { user }} = await supabase.auth.getUser();

  // in order for the set-cookie header to be set,
  // headers must be returned as part of the loader response
  return json(
    {
      env,
      session,
      user,
    },
    {
      headers: headers,
    },
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-950">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const { env, session, user } = useLoaderData<typeof loader>()

  const { supabase } = useSupabase({ env, session })

  return (
    <div className='flex h-screen'>
      {user && <SideNav user={user} />}
      <Outlet context={{ supabase, session, siteUrl: env.SITE_ROOT_URL }} />
    </div>
  ) 
}

const SideNav = ({ user }: { user: User }) => {
  return (
    <nav className="h-screen w-64">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
          <img src={user.user_metadata.avatar_url} alt="avatar" className="w-12 h-12 rounded-full" />
        </div>
        <h1 className="text-white text-center text-sm font-semibold">{user.email}</h1>
      </div>
    </nav>
  )
}