import React from 'react'

import OurService from '../../Components/Pricing/OurService'
import Pricingcard from '../../components/Pricing/Pricingcard'
import { Link } from 'react-router'
import { MoveLeft } from 'lucide-react'


const Pricing = () => {
  return (
    <div className='pt-10 md:pt-20 bg-[#FFFFFF] xl:pt-[120px]'>
        <div className=''>
        </div>
        <Pricingcard/>
        <OurService/>
    </div>
  )
}

export default Pricing
