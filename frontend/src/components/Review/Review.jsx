import React from 'react'
import { IoStarSharp } from "react-icons/io5";

const Review = ({ name, content, stars }) => {
    return (
        <div className='relative flex flex-col text-white font-content gap-y-[10px] top-2 w-[37vw] left-3'>
            <div className='relative flex flex-row gap-x-[10px]'>
                {
                    Array.from({ length: stars }).map((_, index) => (
                        <IoStarSharp className={'text-yellow-500 left-0 w-[30px] h-[30px]'} key={index} />

                    ))
                }
            </div>
            <div className='flex flex-col w-[400px]'>
                <span className='font-semibold'>{`${name} - Happy Customer`}</span>
                <span>
                    {content}
                </span>
            </div>

        </div>

    )
}

export default Review