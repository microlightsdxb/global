import Index from "../../components/AboutUs/Index";


export default async function Home() {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/admin/about`, { next: { revalidate: 60 } });
    const data = await response.json();
    return (
      <>
      <Index data={data?.data} />
      </>
    );
  } catch (error) {
    console.log(error)
  }
}
