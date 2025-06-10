import Head from 'next/head'
import ContentArea from './ContentArea'

export default function index() {
  return (
    <>
      <Head>
        <title>Microlights Lighting LLC Website Terms and Conditions</title>
        <meta name="description" content="Welcome to our Website www.microlights.com (“Website”). This Website is operated by Microlights Lighting LLC (“Microlights”) (also referred to as “us”, “we”, “our” in these Terms and Conditions). Please read these Terms and Conditions carefully, they govern your access and use of the Website." />
      </Head>
      <main>
        <ContentArea />
      </main>
    </>
  )
}
