import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setHairfall } from '../../features/formSlice/formSlice';

const ImageUpload = ({ onImageUpload, error = false }) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isHairfall, setIsHairfall] = useState(null);
    const dispatch = useDispatch()
 
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
            onImageUpload(file);

            const formData = new FormData();
            formData.append('file', file);

            try {
                setLoading(true);
                const response = await axios.post('https://haircare-xmpz.onrender.com/api/v1/report/analyzeImage', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });  
                console.log("response is: ", response.data.data.isHairfall)
                setIsHairfall(response.data.data.isHairfall);
                dispatch(setHairfall(response.data.data.isHairfall))

            } catch (error) {
                // Handle error response
                console.log(error)
                console.error('Error uploading image:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className='flex flex-col space-y-[10px]'>
            <div className={`${error ? 'text-red-500' : 'text-label'} font-semibold font-content text-[1rem]`}>
                <label htmlFor='imageUpload'>Upload Image</label>
            </div>
            <div className={`md:w-[400px] md:h-[300px] w-full h-[200px] mb-[20px] border-2 border-dashed ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg overflow-hidden relative`}>
                <input
                    type="file"
                    accept="image/*"
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    onChange={handleImageChange}
                />
                {image ? (
                    <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Upload Image
                    </div>
                )}
            </div>
            {(isHairfall !== null && isHairfall === false) && <p className='font-content text-red-500'>Image is not of hairfall</p>}
            {(isHairfall !== null && isHairfall === true) && <p className='font-content text-green-500'>Image is of hairfall</p>}
        </div>
    );
};

export default ImageUpload;