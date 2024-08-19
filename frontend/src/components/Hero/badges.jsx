import { v4 as uuidv4 } from 'uuid';
import { FaRegClock } from "react-icons/fa";
import { BiSolidNotepad } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";

const badges = [
    {
        id: uuidv4(),
        icon: <FaRegClock className='w-[20px] h-[20px] text-blue-600'/>,
        text: '24/7 Online Support',
        className: 'absolute top-10 left-10 lg:top-20 lg:-left-5 z-10'
    },
    {
        id: uuidv4(),
        icon: <BiSolidNotepad className='w-[20px] h-[20px] text-orange-600'/>,
        text: 'Online Test',
        className: 'absolute top-10 left-10 lg:top-[600px] lg:-left-20 md:top-[400px] top-[400px] left-[10px] z-10'
    },
    {
        id: uuidv4(),
        icon: <FaCheckCircle className='w-[20px] h-[20px] text-green-600'/>,
        text: 'Trusted Results',
        className: 'absolute top-10 left-10 xl:top-[350px] xl:left-[400px] lg:top-[350px] lg:left-[350px] md:top-[400px] md:left-[500px] top-[300px] left-[150px] z-10'
    },
]

export default badges