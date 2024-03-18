import { LoaderFunction, json } from '@remix-run/node'
import Login from '~/components/login'
import { requireSession } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  const session = await requireSession(request)

  return json({ session })
}

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Login />
    </div>
  )
}
