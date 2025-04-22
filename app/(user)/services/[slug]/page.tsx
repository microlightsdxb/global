import Service from '@/app/components/Service/Index'
import React from 'react'
import type { Metadata } from "next";

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const slug = (await params).slug
  const response = await fetch(`${process.env.BASE_URL}/api/admin/service?slug=${slug}`, { next: { revalidate: 60 } });
  const data = await response.json();

  const metadataTitle = data?.data?.metaTitle || "Microlights";
  const metadataDescription =
    data?.data?.metaDescription || "Microlights";

  return {
    title: metadataTitle,
    description: metadataDescription,
  };
}

export default async function ServicePage({params}: {params: Promise<{slug: string}>}){
  try {
    const slug = (await params).slug
    const response = await fetch(`${process.env.BASE_URL}/api/admin/service?slug=${slug}`,{next:{revalidate:60}})
    const data = await response.json()
    console.log(data)
    return (
          <Service data={data.data}/>
      )
  } catch (error) {
    console.log(error)
  }

}
