import React from 'react'

import Imgbanner from "../common/Imgbanner";

import Strength from "../Industries/sections/Strength";
import Introducing from "../common/Introducing";
import Conceptual from "../Services/sections/Conceptual";
import ImageSec from "../Services/sections/ImageSec";
import { Service as serviceType} from "@/types/Service";

const Service = ({data}: {data: serviceType}) => {
    return (
        <>
          <div className="headerpadding"> </div>
            <Imgbanner data={data}/>
          <Introducing data={data} />
          {data.introImage && <ImageSec data={data}/>}
          {data.method.name=="image" && <Conceptual  data={data}/>}
          {data.method.name=="icon" && <Strength data={data} />}
    
        </>
      );
}

export default Service;