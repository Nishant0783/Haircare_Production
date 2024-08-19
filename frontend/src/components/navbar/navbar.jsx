import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoCloseSharp } from 'react-icons/io5';
import { navItems } from './navItems';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className='bg-white py-[10px]'>
            <div className='grid grid-cols-2 bg-transparent'>
                <div className='col-span-1 bg-transparent text-3xl font-bold text-blue-600 font-title'>
                    <Link to="/">LOGO</Link>
                </div>
                <div className='col-span-1 bg-transparent text-[0.9rem] lg:text-[1rem] font-semibold text-content font-title ml-auto my-auto'>
                    <div className='flex gap-x-[50px] bg-transparent max-sm:hidden'>
                        {navItems.map((element) => (
                            <div key={element.id} className='bg-transparent hover:bg-gray-100 px-[10px] rounded-[5px] py-[5px]'>
                                <Link to={element.link} className='bg-transparent'>{element.title}</Link>
                            </div>
                        ))}
                    </div>

                    {/* Hamburger icon */}
                    <div className='block sm:hidden text-3xl text-content' onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <IoCloseSharp /> : <GiHamburgerMenu />}
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className='sm:hidden absolute top-[50px] bg-white shadow-lg z-50 w-full left-0'>
                    <div className='flex flex-col items-center py-2'>
                        {navItems.map((element) => (
                            <>
                                <Link
                                    key={element.id}
                                    to={element.link}
                                    className='text-[#31304E] text-[1.2rem] font-semibold py-2'
                                    onClick={toggleMobileMenu}
                                >
                                    {element.title}
                                </Link>
                                <hr class="h-px my-1 border-t bg-gray-700"></hr>
                            </>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
