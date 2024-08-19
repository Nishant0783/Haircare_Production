import React from 'react';
import { useSelector } from 'react-redux';
import Form from '../components/form/Form';
import FormLayout from '../components/Form-Layout/FormLayout';
import FormComplex from '../components/form/FormComplex';

const OnlineTest = () => {
    const step = useSelector((state) => state.form.step);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            {step === 1 && (
                <FormLayout 
                    heading={'Fill in some details to get started'}
                    subheading={''}
                    step={step}
                    children={<Form />}
                />
            )}

            {step === 2 && (
                <FormLayout 
                    heading='Just, One more Step'
                    subheading='Fill in the details accurately, to get perfect results'
                    step={step}
                    children={<FormComplex />}
                />
            )}
        </div>
    );
}

export default OnlineTest;
