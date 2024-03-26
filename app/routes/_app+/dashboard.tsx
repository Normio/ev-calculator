import { LoaderFunctionArgs } from '@remix-run/node'
import { requireUser } from '~/lib/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUser(request)

  return null
}

export default function Dashboard() {
  return <h1>Dashboard</h1>
}
