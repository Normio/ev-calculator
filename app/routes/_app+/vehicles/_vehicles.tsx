import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUser } from '~/lib/session.server'
import { createServerClient } from '~/lib/supabase.server'
import { DataTable } from './data-table'
import { columns } from './columns'
import { Tables } from 'db_types'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUser(request)
  const { supabase } = createServerClient(request)

  const { data, error } = await supabase.from('vehicle').select()

  const vehicles: Tables<'vehicle'>[] = data ?? []

  if (error) {
    return json({
      vehicles: vehicles,
      error: 'Error fetching vehicles. Try again later.',
    })
  }

  return json({
    vehicles: vehicles,
    error: null,
  })
}

export default function Vehicles() {
  const { vehicles, error } = useLoaderData<typeof loader>()

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl">Vehicles</h1>
      <div className="w-full md:mx-auto md:max-w-xl">
        <DataTable data={vehicles} columns={columns} />
      </div>
    </div>
  )
}
