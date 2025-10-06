"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ClientSideLinkProps {
  href: string;
  name: string;
  icon: React.ReactNode;
  className?: string;
  children?: { href: string; name: string }[];
  isOpen?: boolean;
  setOpenLink?: (href: string | null) => void;
  pathname?: string;
}

const handleLogout = async () => {
  try {
    const res = await fetch("/api/admin/logout", {
      method: "POST",
    });
    const data = await res.json();
    if (data.success) {
      window.location.href = "/admin/login";
    }
  } catch (error) {
    console.log(error);
  }
}

// Client component for handling active states
export default function ClientSideLink({
  href,
  name,
  icon,
  className,
  children,
  isOpen = false,
  setOpenLink,
  pathname,
}: ClientSideLinkProps) {

  const isActive = pathname === href;

  return (
    <>
      <Link
        href={href == "/admin/logout" ? "#" : href}
        onClick={() => {  // Prevent navigation on click
          setOpenLink?.(isOpen ? null : href);
          if (href === "/admin/logout") {
            handleLogout();
            return;
          }
        }}
        className={cn(
          "flex items-center px-4 py-2 text-[16px] font-medium rounded-md transition-colors",
          "hover:bg-gray-50 hover:text-primary",
          isActive ? "bg-gray-50 text-primary" : "text-gray-700",
          className
        )}
      >
        <span className="mr-3">{icon}</span>
        {name}
      </Link>
      {isOpen && children && (
        <div className="flex pl-14 flex-col items-start gap-2">
          {children.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`w-full p-2 rounded-md cursor-pointer hover:bg-gray-50 hover:text-primary text-[16px] ${isActive ? "bg-gray-50 text-primary" : "text-gray-700"}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
