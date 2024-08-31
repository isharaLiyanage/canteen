"use client";
import { Orders } from "@/components/admin/orders/Table";
import { LoadingUi } from "@/components/globule/loadingUi";
import { fetcher } from "@/utils/fetcher";
import React from "react";
import useSWR from "swr";
import Loading from "../loading";

export default function Page() {
  const { data, error, isLoading } = useSWR<any>("/api/admin/orders", fetcher);

  return (
    <div>
      {isLoading && <div> {<Loading />}</div>}
      {data && <Orders OderData={data.orders} />}
      {error && <div> Wrong</div>}
    </div>
  );
}
