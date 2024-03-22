import { LoaderFunctionArgs, json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { User } from '@supabase/supabase-js'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { requireUser } from '~/lib/session.server'
import { SupabaseContext } from '~/lib/supabase'
import { abbreviate } from '~/lib/utils'
import { useSupabaseContext } from '~/root'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireUser(request)

  return json({
    user,
  })
}

export default function AppLayout() {
  const { user } = useLoaderData<typeof loader>()
  const supabaseContext = useSupabaseContext()

  console.log('user', user)

  return (
    <div className="flex h-screen">
      <SideNav user={user} />
      <Outlet context={{ ...supabaseContext } satisfies SupabaseContext} />
    </div>
  )
}

const SideNav = ({ user }: { user: User }) => {
  return (
    <nav className="h-screen w-64">
      <div className="flex h-full flex-col items-center justify-between">
        <div className="text-white">Logo</div>
        <div className="flex flex-col items-center gap-4 text-white">
          <Link to={'/dashboard'}>Dashboard</Link>
          <Link to={'/vehicles'}>Vehicles</Link>
          <Link to={'/charging'}>Charging locations</Link>
        </div>
        <div className="my-4 flex w-full items-center gap-4 px-4">
          <Avatar>
            <AvatarImage src={user.user_metadata.avatar_url} alt="avatar" />
            <AvatarFallback className="bg-purple-800 text-white">{abbreviate(user.user_metadata.full_name, 'WOW')}</AvatarFallback>
          </Avatar>
          <p className="truncate text-center text-sm font-semibold text-white">{user.email}</p>
        </div>
      </div>
    </nav>
  )
}
