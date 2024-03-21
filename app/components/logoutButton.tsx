import { useNavigate } from '@remix-run/react'
import { Button } from './ui/button'
import { useSupabaseContext } from '~/root'

export default function Logout() {
  const navigate = useNavigate()
  const { supabase, session } = useSupabaseContext();

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
