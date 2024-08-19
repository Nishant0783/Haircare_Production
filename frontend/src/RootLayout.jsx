import React from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className='max-w-[1550px] mx-auto sm:px-[30px] px-[10px]'>
        <Outlet />
    </div>
  )
}

export default RootLayout