import React from 'react'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'

const HeroLeft = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('take-test')
    }

    return (
        <div className='flex flex-col align-middle justify-center gap-y-[10px] lg:gap-y-[50px] md:my-0 my-[10px]'>
            <div className='flex flex-col max-lg:text-center'>
                <div className='font-title  text-[3rem] 2xl:text-[6rem] xl:text-[5rem] lg:text-[4rem] md:text-[3rem] font-semibold text-content'>
                    <p className='leading-tight'>Need Health Consultation?</p>
                </div>
                <div className='font-title text-[2rem] 2xl:text-[5rem] xl:text-[4rem] lg:text-[3rem] md:text-[2rem] font-semibold text-content'>
                    <p>Now on Your Hands.</p>
                </div>
                <div className='font-title text-[0.8rem] md:text-[1rem] xl:text-[1.5rem] text-content lg:w-[80%]'>
                    <p>Clinical excellence must be priority for any health care service provider.</p>
                </div>
            </div>
            <div className='max-lg:mx-auto'>
                <Button 
                    type='button'
                    onClick={handleClick}
                    bgColor={'bg-btn'}
                    content={'Take Online Test'}
                    contentColor={'text-btn-text'}
                    extraClass={'px-[20px] py-[10px] lg:px-[80px] md:px-[50px] md:text-[1.2rem] hover:bg-blue-700'}
                />
            </div>
        </div>
    )
}

export default HeroLeft