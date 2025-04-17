import Service from '@/app/components/Service/Index'
import React from 'react'



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
