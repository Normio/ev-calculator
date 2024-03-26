import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { createServerClient } from '~/lib/supabase.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabase } = createServerClient(request)

  const { data, error } = await supabase.from('vehicle').select()

  if (error) {
    return json({
      vehicles: [],
      error: 'Error fetching vehicles. Try again later.',
    })
  }

  return json({
    vehicles: data,
    error: null,
  })
}

export default function Vehicles() {
  const { vehicles, error } = useLoaderData<typeof loader>()

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <>
      <h1>Vehicles</h1>
      <pre>{JSON.stringify(vehicles, null, 2)}</pre>
    </>
  )
}
