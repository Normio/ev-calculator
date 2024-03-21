import { LoaderFunction, json } from '@remix-run/node'
import LogoutButton from '~/components/logoutButton'
import { requireUser } from '~/lib/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)

  return json({ user })
}

export default function Dashboard() {
  return (
    <div className='bg-slate-900 rounded-lg p-4 m-2 flex-1'>
      <h1>Dashboard</h1>
      <LogoutButton />
    </div>
  )
}
