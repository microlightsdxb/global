

import {
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import ClientSideLink from "../client-side-link";
import AdminNavbar from "@/app/components/AdminNavbar/Index";
import Image from "next/image";


export default function AdminLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="flex w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
        {/* Brand */}
        <div className="flex h-[72px] items-center border-b border-gray-100 px-6">
          <Image src="/assets/img/logo.svg" alt="Microlights" width={130} height={40} className="h-auto w-[130px]" priority />
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">
            Content
          </p>
          <nav className="flex flex-col gap-0.5">
            <AdminNavbar />
          </nav>
        </div>

        {/* Logout Section */}
        <div className="border-t border-gray-100 p-3">
          <ClientSideLink
            href="/admin/logout"
            name="Logout"
            icon={<ArrowRightOnRectangleIcon className="text-red-500" />}
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1  h-screen overflow-y-auto p-8">{children}</main>
    </div>
  );
}
