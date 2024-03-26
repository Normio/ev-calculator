import { LoaderFunctionArgs } from '@remix-run/node'
import { requireUser } from '~/lib/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUser(request)

  return null
}

export default function Charging() {
  return <h1>Charging</h1>
}
