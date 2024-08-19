import React, { useState, useEffect, useRef } from 'react';
import Input from '../Inputs/Input';
import Button from '../Button/Button';
import { validateForm } from '../../utils/formValidations';
import { useDispatch } from 'react-redux'
import { setPersonalDetails, setStep } from '../../features/formSlice/formSlice'

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: ''
    });
    const [errors, setErrors] = useState([]);
    const numberInputRef = useRef(null);
    const dispatch = useDispatch()

    const handleFormChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    useEffect(() => {
        const numberInput = numberInputRef.current;

        if (!numberInput) return; // Exit if the ref is not set yet

        const handleKeyDown = (e) => {
            const key = e.key;
            const isNumericKey = /^[0-9]$/.test(key);
            if (!isNumericKey && key !== 'Backspace' && key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Delete' && key !== 'Tab') {
                e.preventDefault(); // Prevent default behavior if the key is not numeric
            }
        };

        numberInput.addEventListener('keydown', handleKeyDown);

        // Clean up the event listener on component unmount
        return () => {
            numberInput.removeEventListener('keydown', handleKeyDown);
        };
    }, [numberInputRef.current]); // Depend on ref to make sure it's set

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        if (errors.length > 0) {
            setErrors(errors);
            return
        }

        dispatch(setPersonalDetails(formData))
        dispatch(setStep(2))
    };

    return (
        <div className='sm:my-[50px] my-[20px]'>
            <form
                className='flex flex-col md:gap-y-[60px] sm:gap-y-[40px] gap-y-[20px]'
                onSubmit={handleSubmit}
            >
                <div className='flex flex-col gap-y-[5px]'>
                    <Input
                        type='text'
                        id='name'
                        label='Your Name'
                        onChange={handleFormChange}
                        error={errors.includes('name')}
                    />
                    {errors.includes('name') && <p className='text-red-500'>Name can't be empty</p>}
                </div>

                <div className='flex flex-col gap-y-[5px]'>
                    <Input
                        type='email'
                        id='email'
                        label='Your Email'
                        onChange={handleFormChange}
                        error={errors.includes('email')}
                    />
                    {errors.includes('email') && <p className='text-red-500'>Email can't be empty</p>}
                </div>

                <div className='flex flex-col gap-y-[5px]'>
                    <Input
                        type='text'
                        id='number'
                        label='Your Number'
                        maxLength={10} // Limit the input to 10 characters
                        onChange={handleFormChange}
                        error={errors.includes('number')}
                        ref={numberInputRef}
                    />
                    {errors.includes('number') && <p className='text-red-500'>Phone number must be 10 digits</p>}
                </div>

                <div className='flex justify-center'>
                    <Button
                        type={'submit'}
                        bgColor={'bg-btn'}
                        content={'Next'}
                        contentColor={'text-btn-text'}
                        extraClass={'px-[20px] py-[10px] lg:px-[80px] md:px-[50px] md:text-[1.2rem] hover:bg-blue-700'}
                    />
                </div>
            </form>
        </div>
    );
}

export default Form;
