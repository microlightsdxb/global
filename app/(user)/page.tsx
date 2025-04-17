import Index from "../components/home/Index";

export default async function Home() {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/admin/home`, { next: { revalidate: 60 } });
    const data = await response.json();
    return (
      <Index homeData={data.data} />
    );
  } catch (error) {
    console.log(error)
  }

}
