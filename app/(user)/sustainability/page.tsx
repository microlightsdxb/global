import Index from "../../components/Sustainability/Index";


export default async function Home() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/admin/sustainability`,{next:{revalidate:60}});
    const data = await res.json();
    return (
      <>
      <Index data={data}/>
      </>
    );
  } catch (error) {
    console.log(error)
  }

}
