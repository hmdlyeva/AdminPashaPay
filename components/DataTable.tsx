"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useWindowWidth } from "@react-hook/window-size";

type DataTableProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  pageName?: string;
};

export function DataTable<TData>({
  columns,
  data,
  pageName,
}: DataTableProps<TData>) {
  const onlyWidth = useWindowWidth();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  React.useEffect(() => {
    if (onlyWidth < 1000 && onlyWidth > 850) {
      table.getColumn("status")?.toggleVisibility(false);
    } else if (onlyWidth < 850 && onlyWidth > 750) {
      table.getColumn("createdAt")?.toggleVisibility(false);
    } else if (onlyWidth < 750 && onlyWidth > 600) {
      table.getColumn("email")?.toggleVisibility(false);
    } else if (onlyWidth < 600) {
      table.getColumn("delete")?.toggleVisibility(false);
    } else {
      table.getColumn("status")?.toggleVisibility(true);
      table.getColumn("createdAt")?.toggleVisibility(true);
      table.getColumn("email")?.toggleVisibility(true);
      table.getColumn("delete")?.toggleVisibility(true);
    }
  }, [onlyWidth, table]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          style={{
            boxShadow: "2px 2px 1px rgba(20, 35, 75, 0.5)",
            display: pageName === "settings" ? "none" : "",
          }}
          className="max-w-sm text-ellipsis overflow-hidden"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              style={{
                boxShadow: "2px 2px 1px rgba(20, 35, 75, 0.5)",
                display: pageName === "settings" ? "none" : "",
              }}
              variant="outline"
              className="ml-auto"
            >
              {onlyWidth > 800 ? "Columns" : ""}{" "}
              <ChevronDown
                className={`${onlyWidth > 800 ? "ml-2" : ""} h-4 w-4`}
              />
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
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div
        className="rounded-md border"
        style={{
          boxShadow: "2px 2px 1px rgba(20, 35, 75, 0.5)",
        }}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          {header.id === "select" ? (
                            <Checkbox
                              {...{
                                checked: table.getIsAllPageRowsSelected(),
                                indeterminate:
                                  table.getIsSomePageRowsSelected(),
                                onChange:
                                  table.getToggleAllPageRowsSelectedHandler(),
                              }}
                            />
                          ) : (
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                          )}
                        </>
                      )}
                    </TableHead>
                  );
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
                    <TableCell key={cell.id}>
                      {cell.column.id === "select" ? (
                        <Checkbox
                          {...{
                            checked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            onChange: row.getToggleSelectedHandler(),
                          }}
                        />
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
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
            )}
          </TableBody>
        </Table>
      </div>
      <div
        className="flex items-center justify-end space-x-2 py-4"
        style={{ display: pageName === "settings" ? "none" : "" }}
      >
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            style={{
              boxShadow: "2px 2px 1px rgba(20, 35, 75, 0.5)",
            }}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            style={{
              boxShadow: "2px 2px 1px rgba(20, 35, 75, 0.5)",
            }}
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
