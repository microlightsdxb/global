'use client'

import {RecoilRoot} from 'recoil';
import React from 'react'

const RecoilContext = ({children}:{children:React.ReactNode}) => {
  return (
    <RecoilRoot>{children}</RecoilRoot>
  )
}

export default RecoilContext