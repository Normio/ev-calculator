import { useOutletContext } from '@remix-run/react'
import { SupabaseContext } from '~/utils/supabase'

export default function Login() {
  const { supabase, session, siteUrl } = useOutletContext<SupabaseContext>()

  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${siteUrl}auth/callback`,
      },
    })

    if (error) {
      console.log({ error })
    }
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log(error)
    }
  }

  return session ? (
    <button onClick={handleLogout}>Logout</button>
  ) : (
    <button className="relative p-[3px]" onClick={handleGitHubLogin}>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-purple-400 to-indigo-400" />
      <div className="group relative rounded-[6px] bg-black px-8 py-2 text-base text-white transition duration-200 hover:bg-transparent">
        Start tracking
      </div>
    </button>
  )
}
