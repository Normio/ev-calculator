import { redirect } from '@remix-run/node'
import { createServerClient } from './supabase.server'

export const getSession = async (request: Request) => {
  const { supabase } = createServerClient(request)
  const { data: session } = await supabase.auth.getSession()

  if (!session) {
    throw redirect('/')
  }

  return session
}
