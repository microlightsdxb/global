import Index from "../../components/Sustainability/Index";


export default async function Home() {
  const res = await fetch(`${process.env.BASE_URL}/api/admin/sustainability`,{next:{revalidate:60}});
  const data = await res.json();
  return (
    <>
    <Index data={data}/>
    </>
  );
}
