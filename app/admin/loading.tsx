import { LoadingUi } from "@/components/globule/loadingUi";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className=" flex bg-[#0000003a] items-center justify-center w-full h-screen">
      <LoadingUi />
    </div>
  );
}
