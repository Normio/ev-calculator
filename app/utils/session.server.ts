import { redirect } from '@remix-run/node'
import { createServerClient } from './supabase.server'

export async function getSession(request: Request) {
  const { supabase } = createServerClient(request)
  const { data: {session} } = await supabase.auth.getSession()

  return session
}

export async function requireSession(request: Request, redirectTo: string = new URL(request.url).pathname) {
  const session = await getSession(request)

  if (!session) {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
    throw redirect(`/login?${searchParams}`)
  }

  return session
}

export async function requireUser(request: Request, redirectTo: string = new URL(request.url).pathname) {
  const { supabase } = createServerClient(request)
  const { data: {user} } = await supabase.auth.getUser();

  if (!user) {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
    throw redirect(`/login?${searchParams}`)
  }
  
  return user
}