import { useNavigate, useOutletContext } from '@remix-run/react'
import { SupabaseContext } from '~/lib/supabase'
import { Button } from './ui/button'

export default function Logout() {
  const navigate = useNavigate()
  const { supabase, session } = useOutletContext<SupabaseContext>()

  const handleLogout = async () => {
    if (!session) {
      navigate('/')
    }

    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log(error)
    }

    navigate('/')
  }

  return (
    <Button onClick={handleLogout} variant={'outline'}>
      Logout
    </Button>
  )
}
