import React from 'react'
import HeroLeft from './HeroLeft'
import HeroRight from './HeroRight'
import Badge from '../Badges/Badge'

const Hero = () => {
  return (
    <div className='min-h-screen'>
      <section className='bg-gradient-to-t from-[#c9e8ff] via-[rgba(221,240,253,0.54)] to-[rgba(232,244,253,0.1)] absolute inset-0 z-0 max-h-[70vh] md:max-h-[90vh] top-[56px]' />
      <div className='relative flex flex-col lg:flex-row z-10'>
        <div className='flex justify-center align-middle lg:order-1 order-2'>
          <HeroLeft />
        </div>
        <div className=' lg:order-2 order-1'>
          <HeroRight />
        </div>
      </div>
    </div>
  )
}

export default Hero
