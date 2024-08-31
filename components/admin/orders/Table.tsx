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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { format } from 'date-fns';
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
import { toast } from "sonner";
import Link from "next/link";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import Filter from "./Filter";
type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  product: {
    name: string;
  };
};

type User = {
  id: string;
  email: string | null;
};

type Order = {
  id: string;
  userId: string;
  address: string | null;
  map: string | null;
  status: string;
  user: User;
  orderItems: OrderItem[];
  orderID: string;
  payerID: string;
  paymentSource: string;
  createAt:string
};

type DataType = Order[];

// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   payment?: "cash on delivery" | "payed";
//   email: string;
//   items: string[];
// };

export function Orders({ OderData }: { OderData: DataType }) {
  const setOnTheWay = async (id: string) => {
 

    try {
      const response = await fetch(`/api/admin/orders/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "ON_THE_WAY" }),
      });
      if (response.ok) {
        toast(`Order ${id} status updated to ON THE WAY`);
      } else {
        toast("Failed to update order status");
      }
    } catch (error) {

    }
  };
  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "ID",
      meta: {
        filterVariant: "text",
      },

      cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      meta: {
        filterVariant: "select",
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      // accessorKey: "email",
      accessorFn: (row) => row.user.email,
      id: "email",
      meta: {
        filterVariant: "text",
      },
      header: "Email",
      cell: ({ row }) => {
        const email = row.original.user.email;

        return <div className="lowercase">{email}</div>;
      },
    },
    {
      accessorKey: "orderItems",
      header: () => <div className="text-right">Items & Quantity</div>,
      cell: ({ row }) => {
        const items: string[] = row.getValue("orderItems");

        return (
          <div className=" text-ellipsis font-medium text-right">
            {items.map((e: any) => (
              <div key={e.productId} className="flex justify-between gap-2">
                <p> {e.product.name.substring(0, 10)}</p>
                <p> {e.quantity}</p>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">Amount</div>,
      meta: {
        filterVariant: "range",
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="font-medium text-right">{formatted}</div>;
      },
    },
    {
      accessorKey: "payment",
      id: "payment",
      meta: {
        filterVariant: "text",
      },
      header: "Payment",
      cell: ({ row }) => {
        const payment = row.original.paymentSource || "Cache On delivery";
  
        return <div className="lowercase">{payment}</div>;
      },
    },
    {
      accessorKey: "createAt",
      id: "createAt",
      
      meta: {
        filterVariant: "date",
      },
    
      size:0,
      header: "createAt",
      cell: ({ row }) => {
        const dateString = row.original.createAt;
        const date = new Date(dateString);
        const formattedDate = format(date, "MMMM d, yyyy 'at' h:mm a ");

        return <div className="lowercase">{formattedDate}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const { id } = row.original;
        const { user } = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setOnTheWay(id)}>
                On The Way
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(id)}
              >
                Copy order ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {" "}
                <Link href={`/admin/user/${user.id}`}>View customer</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "createAt",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: OderData,
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

  return (
    <div className="w-full m-2 rounded p-1 my-auto bg-[#ffffff70]">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="w-4 h-4 ml-2" />
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
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} />
                            </div>
                          ) : null}
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
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end py-4 space-x-2">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
