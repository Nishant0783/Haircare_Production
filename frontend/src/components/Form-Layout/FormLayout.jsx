import React from 'react'

/*
    1) Heading
    2) Steppers
    3) children
    4) Button
*/

const FormLayout = ({ heading='', subheading='', step = 1, children }) => {
    return (
        <div className='flex flex-col'>
            <div className='flex flex-col'>
                {/* Heading and subheading */}
                <div className='text-content flex flex-col'>
                    <div className='text-[1rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] font-bold'>
                        <p>{heading}</p>
                    </div>
                    {subheading !== '' &&
                        <div className='text-[1rem] lg:text-[1.5rem]'>
                            <p>{subheading}</p>
                        </div>
                    }

                </div>

                {/* steppers */}
                <div className='flex sm:gap-x-[30px] gap-x-[10px] sm:mt-[30px] mt-[10px]'>
                    <div className={`w-full h-[10px] rounded-full ${step == 1 ? 'bg-btn' : 'bg-gray-300'}`}> </div>
                    <div className={`w-full h-[10px] rounded-full ${step == 2 ? 'bg-btn' : 'bg-gray-300'}`}> </div>
                </div>

                {/* form */}
                {children}

                {/* button */}
                
            </div>
        </div>
    )
}

export default FormLayout
