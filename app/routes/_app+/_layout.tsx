import { LoaderFunctionArgs, json } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData } from '@remix-run/react'
import { User } from '@supabase/supabase-js'
import { BatteryCharging, Car, PlugZap, Wallpaper } from 'lucide-react'
import LogoutButton from '~/components/logoutButton'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { requireUser } from '~/lib/session.server'
import { SupabaseContext } from '~/lib/supabase'
import { abbreviate, cn } from '~/lib/utils'
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

  return (
    <div className="flex h-screen">
      <SideNav user={user} />
      <div className="my-2 mr-2 flex-1 rounded-lg bg-slate-900 p-4">
        <Outlet context={{ ...supabaseContext } satisfies SupabaseContext} />
      </div>
    </div>
  )
}

const SideNav = ({ user }: { user: User }) => {
  return (
    <nav className="h-screen w-64">
      <div className="mx-4 flex h-full flex-col gap-2">
        <div className="my-6 mb-12 flex items-center justify-center gap-4 text-foreground">
          <div className="rounded-full bg-slate-800/70">
            <PlugZap className="m-3 h-8 w-8" />
          </div>
          <p className="text-2xl font-semibold">EV-Calculator</p>
        </div>
        <p className="text-sm text-primary/50">Main</p>
        <div className="flex flex-col gap-2">
          <NavLink to={'/dashboard'}>
            {({ isPending, isActive }) => (
              <Button
                asChild
                variant={'menu'}
                className={cn(
                  'flex w-full justify-start gap-4',
                  isPending || isActive
                    ? 'bg-slate-500/70 text-primary hover:bg-slate-500/70'
                    : '',
                )}
              >
                <span>
                  <Wallpaper className="h-6 w-6" />
                  <span>Dashboard</span>
                </span>
              </Button>
            )}
          </NavLink>
          <NavLink to={'/charging'}>
            {({ isPending, isActive }) => (
              <Button
                asChild
                variant={'menu'}
                className={cn(
                  'flex w-full justify-start gap-4',
                  isPending || isActive
                    ? 'bg-slate-500/70 text-primary hover:bg-slate-500/70'
                    : '',
                )}
              >
                <span>
                  <BatteryCharging className="h-6 w-6" />
                  <span>Charging</span>
                </span>
              </Button>
            )}
          </NavLink>
          <NavLink to={'/vehicles'}>
            {({ isPending, isActive }) => (
              <Button
                asChild
                variant={'menu'}
                className={cn(
                  'flex w-full justify-start gap-4',
                  isPending || isActive
                    ? 'bg-slate-500/70 text-primary hover:bg-slate-500/70'
                    : '',
                )}
              >
                <span>
                  <Car className="h-6 w-6" />
                  <span>Vehicles</span>
                </span>
              </Button>
            )}
          </NavLink>
        </div>
        <div className="my-4 mt-auto flex w-full items-center gap-4">
          <Avatar>
            <AvatarImage src={user.user_metadata.avatar_url} alt="avatar" />
            <AvatarFallback className="bg-purple-800 text-primary">
              {abbreviate(user.user_metadata.full_name, 'WOW')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col overflow-hidden">
            <span className="truncate text-sm text-primary">
              {user.user_metadata.name}
            </span>
            <span className="truncate text-xs text-primary/70">
              {user.email}
            </span>
          </div>
          <LogoutButton />
        </div>
      </div>
    </nav>
  )
}
