import React from 'react'

const Badge = ({className, text, icon}) => {
    return (
        <div className={`px-[15px] py-[8px] bg-white inline-block rounded-[20px] shadow-[0px_5px_11px_0px_#8d9696] ${className}`}>
            <div className='flex justify-center align-middle items-center gap-x-[10px] font-content font-bold'>
                <div className='my-auto'>
                   {icon}
                </div>
                <div className='pt-[2px]'>
                    <p>{text}</p>
                </div>

            </div>
        </div>
    )
}

export default Badge