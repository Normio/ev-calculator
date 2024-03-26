import { ColumnDef } from '@tanstack/react-table'
import { Tables } from 'db_types'

export type Vehicle = Tables<'vehicle'> & {
  type: 'gas' | 'electric'
}

export const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
]
