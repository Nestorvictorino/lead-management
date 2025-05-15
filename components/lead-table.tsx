"use client"

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { updateLeadStatus } from "@/lib/actions"

type Lead = {
  id: string
  name: string
  email: string
  status: string
  createdAt: string
}

export function LeadTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [leads, setLeads] = useState<Lead[]>(initialLeads)

  const columns: ColumnDef<Lead>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Submitted
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return new Date(row.original.createdAt).toLocaleDateString()
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    // {
    //   accessorKey: "status",
    //   header: "Status",
    //   cell: ({ row }) => {
    //     const status = row.original.status

    //     let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "outline"

    //     switch (status) {
    //       case "new":
    //         badgeVariant = "secondary"
    //         break
    //       case "contacted":
    //         badgeVariant = "default"
    //         break
    //       case "qualified":
    //         badgeVariant = "default"
    //         break
    //       case "disqualified":
    //         badgeVariant = "destructive"
    //         break
    //     }

    //     return <Badge variant={badgeVariant}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
    //   },
    // },
    {
      id: "actions",
      cell: ({ row }) => {
        const lead = row.original

        const handleStatusChange = async (newStatus: string) => {
          try {
            await updateLeadStatus(lead.id, newStatus)

            // Update the local state
            setLeads(leads.map((l) => (l.id === lead.id ? { ...l, status: newStatus as any } : l)))

            toast({
              title: "Status updated",
              description: `Lead status updated to ${newStatus}`,
            })
          } catch (error) {
            toast({
              title: "Error",
              description: "Failed to update lead status",
              variant: "destructive",
            })
          }
        }
        console.log(lead.status)
        return (
          <div className="flex items-center justify-end">
            <Select
              defaultValue={lead.status} 
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Change status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">pending</SelectItem>
                <SelectItem value="Reached Out">Reached Out</SelectItem>

              </SelectContent>
            </Select>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: leads,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="🔍 Search"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
        </div>
      </div>
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No leads found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
