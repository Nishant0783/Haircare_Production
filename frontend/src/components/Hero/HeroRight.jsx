import React from 'react'
import doctorMd from '../../../public/doctor1.png'
import doctorSm from '../../../public/doctor2.png'


const HeroRight = () => {
  return (
    <>
      <div className='flex justify-center items-center relative z-0'>
        <img src={doctorMd} alt='Doctor image' className='h-[90vh] w-[900px] hidden md:block' />
        <img src={doctorSm} alt='Doctor image' className='h-[70vh] block md:hidden' />
        {/* {
          badges.map((badge) => (
            <Badge id={badge.id} className={badge.className} icon={badge.icon} text={badge.text} />
          ))
        } */}
      </div>
    </>
  )
}

export default HeroRight
