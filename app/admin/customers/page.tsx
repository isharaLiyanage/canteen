import { CustomerTable } from "@/components/admin/customers/CustomerTable";
import { getServerSideProps } from "@/utils/API_Req/GetUsers";
import React from "react";
export default async function page() {
  const { users, error } = await getServerSideProps();

  return (
    <div className=" px-2 pt-1">
      {users && <CustomerTable users={users.data} />}
    </div>
  );
}
