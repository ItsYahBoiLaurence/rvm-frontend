// import { useFetchApiList } from "@/hooks/useFetchApiList"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFetchApiList } from "@/hooks/useFetchApiList";
import type { ApiData } from "@/types/api";
import { type ColumnFiltersState, type RowSelectionState, type PaginationState, type SortingState, type VisibilityState, useReactTable, type ColumnDef, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const columns: ColumnDef<ApiData>[] = [

    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => <div className="truncate w-30">{row.getValue("id")}</div>
    },
    {
        accessorKey: "companyOwner",
        header: "Owner",
        cell: ({ row }) => <div>{row.getValue("companyOwner")}</div>
    },
    {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => <div> {row.getValue("isActive") ? "Active" : "Inactive"}</div>

    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => <div>{row.getValue("description")}</div>
    },
    {
        accessorKey: "apiKey",
        header: "APIKey",
        cell: ({ row }) => <div className="truncate w-30">{(row.getValue("apiKey"))}</div>
    },
    {
        accessorKey: "dateCreated",
        header: "Date Created",
        cell: ({ row }) => <div>{row.getValue("dateCreated")}</div>
    },
    {
        accessorKey: "role",
        header: "Permission",
        cell: ({ row }) => <div>{row.getValue("role")}</div>
    },
]

export function APIListTable() {

    const { data } = useFetchApiList()

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 12
    })

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
        apiKey: true,
        name: true,
        description: true,
        isActive: true,
        dateCreated: true,
        companyOwner: true,
        role: true,
        id: true
    })

    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),

        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,


        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),

        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination
        },

    })


    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                        Columns <ChevronDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            )
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className="text-center" key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className="text-center" key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    )
}