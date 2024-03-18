import { redirect } from '@remix-run/node'
import { createServerClient } from './supabase.server'

export async function getSession(request: Request) {
  const { supabase } = createServerClient(request)
  const { data } = await supabase.auth.getSession()

  return data.session
}

export async function requireSession(request: Request) {
  const session = await getSession(request)

  if (!session) {
    throw redirect('/')
  }

  return session
}
