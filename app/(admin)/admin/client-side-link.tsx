"use client";

import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
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
};

const matches = (pathname: string | undefined, href: string) =>
  !!pathname && (pathname === href || pathname.startsWith(href + "/"));

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
  const hasChildren = !!children?.length;

  // Most specific child wins, so "/admin/products/type" doesn't also light up "/admin/products".
  const activeChild = hasChildren
    ? children!
        .filter((child) => matches(pathname, child.href))
        .sort((a, b) => b.href.length - a.href.length)[0]?.href
    : undefined;

  const isActive = hasChildren ? false : matches(pathname, href);
  const isParentOfActive = !!activeChild;

  const rowClass = cn(
    "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors duration-200",
    isActive
      ? "bg-gray-900 text-white shadow-sm"
      : isParentOfActive
        ? "text-gray-900"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    className
  );

  const iconClass = cn(
    "flex shrink-0 items-center [&>svg]:h-[18px] [&>svg]:w-[18px] transition-colors duration-200",
    isActive
      ? "text-white"
      : isParentOfActive
        ? "text-gray-900"
        : "text-gray-400 group-hover:text-gray-700"
  );

  if (hasChildren) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpenLink?.(isOpen ? null : href)}
          aria-expanded={isOpen}
          className={cn(rowClass, "cursor-pointer")}
        >
          <span className={iconClass}>{icon}</span>
          <span className="flex-1 text-left">{name}</span>
          <ChevronDownIcon
            className={cn(
              "h-4 w-4 text-gray-400 transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          />
        </button>

        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-out",
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="ml-[21px] mt-1 mb-1 flex flex-col gap-0.5 border-l border-gray-200 pl-3">
              {children!.map((item) => {
                const childActive = item.href === activeChild;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-[13.5px] transition-colors duration-200",
                      childActive
                        ? "bg-gray-100 font-medium text-gray-900 before:absolute before:-left-[13px] before:top-1/2 before:h-5 before:w-[2px] before:-translate-y-1/2 before:rounded-full before:bg-gray-900"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={href == "/admin/logout" ? "#" : href}
      onClick={() => {
        setOpenLink?.(null);
        if (href === "/admin/logout") {
          handleLogout();
        }
      }}
      className={rowClass}
    >
      <span className={iconClass}>{icon}</span>
      {name}
    </Link>
  );
}
