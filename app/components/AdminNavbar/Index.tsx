"use client"

import ClientSideLink from '@/app/(admin)/admin/client-side-link';
import React, { useState } from 'react'
import {
    HomeIcon,
    NewspaperIcon,
    UserGroupIcon,
    EnvelopeIcon,
    CheckBadgeIcon,
    PresentationChartBarIcon,
    InformationCircleIcon,
  } from "@heroicons/react/24/outline";
import { BiLeaf } from 'react-icons/bi';
import { usePathname } from 'next/navigation';
import { BsGear } from 'react-icons/bs';

const AdminNavbar = () => {

    const [openLink, setOpenLink] = useState<string | null>(null);
    const pathname = usePathname();

    console.log(pathname);

    const navItems = [
        { name: "Home", href: "/admin/home", icon: HomeIcon },
        { name: "About", href: "/admin/about", icon: InformationCircleIcon },
        { name: "Products", href: "##", icon: PresentationChartBarIcon,children:[{name:"Type & Category",href:"/admin/products/type"},{name:"Products",href:"/admin/products"}] },
        { name: "Services", href: "/admin/services", icon: EnvelopeIcon },
        // { name: "Industries", href: "/admin/industries", icon: BriefcaseIcon },
        { name: "Projects", href: "/admin/projects", icon: CheckBadgeIcon },
        { name: "Sustainability", href: "/admin/sustainability", icon: BiLeaf },
        { name: "Blogs", href: "/admin/blogs", icon: NewspaperIcon },
        { name: "Team", href: "/admin/team", icon: UserGroupIcon },
        { name: "Contact", href: "#", icon: EnvelopeIcon,children:[{name:"Regions",href:"/admin/contact"},{name:"Enquiries",href:"/admin/contact/enquiry"}] },
        { name: "Settings", href: "/admin/settings", icon: BsGear },
      ];

  return (
    navItems.map((item) => {
        const Icon = item.icon;
        return (
          <ClientSideLink
            key={item.href}
            href={item.href}
            name={item.name}
            icon={<Icon className="h-5 w-5" />}
            isOpen={openLink === item.href}
            setOpenLink={setOpenLink}
            pathname={pathname}
          >
            {item.children}
          </ClientSideLink>
        );
      })
  )
}

export default AdminNavbar