import { useRevalidator } from '@remix-run/react'
import { createBrowserClient } from '@supabase/ssr'
import { Session, SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'db_types'
import { useEffect, useState } from 'react'

type UseSupabaseArgs = {
  env: {
    SUPABASE_URL: string
    SUPABASE_ANON_KEY: string
  }
  session: Session | null
}

export type TypedSupabaseClient = SupabaseClient<Database>
export type MaybeSession = Session | null

export type SupabaseContext = {
  supabase: TypedSupabaseClient
  session: MaybeSession
  siteUrl: string
}

export const useSupabase = ({ env, session }: UseSupabaseArgs) => {
  // it is important to create a single instance of Supabase
  // to use across client components - there for we call this func only in the root and pass it via Outlet context
  const [supabase] = useState(() => createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY))

  const serverAccessToken = session?.access_token

  const revalidator = useRevalidator()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverAccessToken) {
        revalidator.revalidate()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [serverAccessToken, supabase, revalidator])

  return { supabase }
}
