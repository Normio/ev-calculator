import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { User } from "@supabase/supabase-js";
import { requireUser } from "~/lib/session.server";
import { SupabaseContext } from "~/lib/supabase";
import { useSupabaseContext } from "~/root";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireUser(request)

  return json(
    {
      user,
    },
  )
}

export default function AppLayout() {
  const { user } = useLoaderData<typeof loader>()
  const supabaseContext = useSupabaseContext();

  return (
    <div className='flex h-screen'>
      <SideNav user={user} />
      <Outlet context={{...supabaseContext} satisfies SupabaseContext} />
    </div>
  )
}

const SideNav = ({ user }: { user: User }) => {
  return (
    <nav className="h-screen w-64">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
          <img src={user.user_metadata.avatar_url} alt="avatar" className="w-12 h-12 rounded-full" />
        </div>
        <h1 className="text-white text-center text-sm font-semibold">{user.email}</h1>
      </div>
    </nav>
  )
}