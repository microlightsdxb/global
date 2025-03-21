import React from "react";
import Address from "./sections/Address";
import Banner from "./sections/Banner";
import {banner} from "./data/dataBox"
import ContactForm from "./sections/ContactForm";
const Index = () => {
  return (
    <>
      <div className="headerpadding"> </div>

      <Banner data={banner.data} />
      <Address />
      <ContactForm />



    </>
  );
};

export default Index;
