import { LoaderFunction, json } from '@remix-run/node'
import LogoutButton from '~/components/logoutButton'
import { requireUser } from '~/lib/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request)

  return json({ user })
}

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <LogoutButton />
    </div>
  )
}
