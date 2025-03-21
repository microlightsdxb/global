"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ForwardRefExoticComponent, RefAttributes, SVGProps, useState } from "react";

interface ClientSideLinkProps {
  href: string;
  name: string;
  icon: React.ReactNode;
  className?: string;
  children?: {name:string,href:string}[];
}

// Client component for handling active states
export default function ClientSideLink({ href, name, icon, className,children }: ClientSideLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname?.startsWith(`${href}/`);
  const [isOpen,setIsOpen] = useState(false);

  return (
    <>
    <Link
      href={href}
      onClick={()=>setIsOpen(!isOpen)}
      className={cn(
        "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
        "hover:bg-gray-50 hover:text-primary",
        isActive ? "bg-gray-50 text-primary" : "text-gray-700",
        className
      )}
    >
      <span className="mr-3">{icon}</span>
      {name}
    </Link>
    <div className="flex pl-14 flex-col items-start gap-2">
    {isOpen && children?.map((item,index)=>(
          <Link key={index} href={item.href} className="w-full p-2 rounded-md cursor-pointer hover:bg-gray-50 hover:text-primary">
          {item.name}
        </Link>
    ))}
    </div>

    </>
  );
}
