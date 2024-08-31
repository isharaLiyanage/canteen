// "use client";
// import { Column, ColumnDef } from "@tanstack/react-table";
// import React from "react";
// type FilterVariant = "text" | "range" | "select" | undefined;
// export default function Filter({ column }: { column: Column<any, unknown> }) {
//   const columnFilterValue = column.getFilterValue();
//   const { filterVariant } = column.columnDef.meta ?? ({} as FilterVariant);

//   return filterVariant === "range" ? (
//     <div>
//       <div className="flex space-x-2">
//         {/* See faceted column filters example for min max values functionality */}
//         <DebouncedInput
//           type="number"
//           value={(columnFilterValue as [number, number])?.[0] ?? ""}
//           onChange={(value) =>
//             column.setFilterValue((old: [number, number]) => [value, old?.[1]])
//           }
//           placeholder={`Min`}
//           className="w-24 border rounded shadow"
//         />
//         <DebouncedInput
//           type="number"
//           value={(columnFilterValue as [number, number])?.[1] ?? ""}
//           onChange={(value) =>
//             column.setFilterValue((old: [number, number]) => [old?.[0], value])
//           }
//           placeholder={`Max`}
//           className="w-24 border rounded shadow"
//         />
//       </div>
//       <div className="h-1" />
//     </div>
//   ) : filterVariant === "select" ? (
//     <select
//       onChange={(e) => column.setFilterValue(e.target.value)}
//       value={columnFilterValue?.toString()}
//     >
//       {/* See faceted column filters example for dynamic select options */}
//       <option value="">All</option>
//       <option value="ON_THE_WAY">ON THE WAY</option>
//       <option value="PROCESS">PROCESS</option>
//       <option value="CANCELLED">CANCELLED</option>
//       <option value="DELIVERED">DELIVERED</option>
//     </select>
//   ) : filterVariant === "text" ? (
//     <DebouncedInput
//       className="border-slate-200 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 flex w-full h-8 px-3 py-2 text-sm bg-white border rounded-md"
//       onChange={(value) => column.setFilterValue(value)}
//       placeholder={`Search...`}
//       type="text"
//       value={(columnFilterValue ?? "") as string}
//     />
//   ) : (
//     ""
//   );
// }
// function DebouncedInput({
//   value: initialValue,
//   onChange,
//   debounce = 500,
//   ...props
// }: {
//   value: string | number;
//   onChange: (value: string | number) => void;
//   debounce?: number;
// } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
//   const [value, setValue] = React.useState(initialValue);

//   React.useEffect(() => {
//     setValue(initialValue);
//   }, [initialValue]);

//   React.useEffect(() => {
//     const timeout = setTimeout(() => {
//       onChange(value);
//     }, debounce);

//     return () => clearTimeout(timeout);
//   }, [value]);

//   return (
//     <input
//       {...props}
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//     />
//   );
// }
