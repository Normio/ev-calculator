import { useNavigate } from '@remix-run/react'
import { Button } from './ui/button'
import { useSupabaseContext } from '~/root'
import { LogOut, icons } from 'lucide-react'

export default function Logout() {
  const navigate = useNavigate()
  const { supabase, session } = useSupabaseContext()

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
    <Button onClick={handleLogout} variant="ghost" size={'icon'} className="h-10 min-w-10 rounded-full">
      <LogOut className="h-4 w-4" />
    </Button>
  )
}
