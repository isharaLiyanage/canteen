import SideBar from "@/components/admin/sideBar";
import { Toaster } from "sonner";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex">
      <SideBar />
      <main className=" h-screen bg-[#f7f7f73d] w-full">{children}</main>
      <Toaster />
    </div>
  );
}
