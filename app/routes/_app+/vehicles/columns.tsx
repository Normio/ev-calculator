import { ColumnDef } from '@tanstack/react-table'
import { Tables } from 'db_types'
import { Fuel, MoreHorizontal, Pencil, Trash2, Zap } from 'lucide-react'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

export const columns: ColumnDef<Tables<'vehicle'>>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
  },
  {
    accessorKey: 'model',
    header: 'Model',
  },
  {
    accessorKey: 'vehicle_type',
    header: () => <div className="text-center">Type</div>,
    meta: { className: 'w-16' },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          {row.getValue('vehicle_type') == 'gas' ? (
            <Fuel className="h-6 w-6" />
          ) : (
            <Zap className="h-6 w-6 text-yellow-500" />
          )}
        </div>
      )
    },
  },
  {
    id: 'actions',
    meta: { className: 'w-8' },
    cell: ({ row }) => {
      const vehicle = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => console.log('Edit:', vehicle.id)}
              className="flex gap-2"
            >
              <Pencil className="h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => console.log('Delete:', vehicle.id)}
              className="flex gap-2 text-red-600 focus:bg-red-500/50 focus:text-red-100/80"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
