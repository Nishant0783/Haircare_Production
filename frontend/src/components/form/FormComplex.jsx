import React, { useState } from 'react'
import ImageUpload from '../ImageUpload/ImageUpload'
import Input from '../Inputs/Input'
import Button from '../Button/Button';
import { validateForm } from '../../utils/formValidations';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setGeneticDetails, setStep } from '../../features/formSlice/formSlice';
import axios from 'axios';
import { setReport } from '../../features/reportSlice/reportSlice';

const FormComplex = () => {
    const [formData, setFormData] = useState({
        image: '',
        dob: '',
        gender: '',
        familyHistory: '',
        stressLevel: ''
    })
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const isHairfall = useSelector((state) => state.form.isHairfall);
    const { name, email, number } = useSelector((state) => state.form.personalDetails)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [compError, setCompError] = useState('')

    const today = new Date().toISOString().split('T')[0];

    const handleImageUpload = (image) => {
        setFormData({
            ...formData,
            image
        })
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        console.log("Analyse button clicked");
        e.preventDefault();

        // Validate form data
        const errors = validateForm(formData);
        console.log("errros are: ", errors)
        if (errors.length > 0) {
            setErrors(errors);
            return;
        }

        // Create FormData object
        const formDataToSend = new FormData();
        formDataToSend.append('file', formData.image); // Append the image file
        formDataToSend.append('dob', formData.dob);
        formDataToSend.append('gender', formData.gender);
        formDataToSend.append('familyHistory', formData.familyHistory);
        formDataToSend.append('stressLevel', formData.stressLevel);

        // Add personal details
        formDataToSend.append('username', name);
        formDataToSend.append('email', email);
        formDataToSend.append('number', number);
        console.log("Form data to send: ", formDataToSend)

        try {
            setLoading(true);
            console.log("Inside try")
            // Update Redux store
            dispatch(setGeneticDetails({
                dob: formData.dob,
                gender: formData.gender,
                familyHistory: formData.familyHistory,
                stressLevel: formData.stressLevel
            }));

            // Make the API request
            const response = await axios.post('https://haircare-xmpz.onrender.com/api/v1/report/generateReport', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Response from report: ", response.data.data.report);
            // Handle response (e.g., navigate to another page or update the state)
            dispatch(setReport(response.data.data.report))
            navigate('/result')
        } catch (error) {
            console.log(error)
            console.log(error.response.status)
            if (error.response.status === 500) {
                setCompError(error.response.statusText)
            }
            // Handle error (e.g., show an error message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='sm:my-[50px] my-[20px]'>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col md:flex-row md:gap-x-[50px] gap-y-[30px]'>
                    <div>
                        <ImageUpload onImageUpload={handleImageUpload} error={errors.includes('image')} />
                    </div>
                    <div className='flex flex-col gap-y-[20px]'>
                        <div className='mt-[15px]'>
                            <Input
                                type='date'
                                name='dob'
                                id='dob'
                                label='Date Of Birth'
                                max={today}
                                onChange={handleFormChange}
                                error={errors.includes('dob')}
                            />
                        </div>
                        <div>
                            <Input
                                type='radio'
                                id='gender'
                                label='Gender'
                                options={[
                                    { value: 'male', label: 'Male' },
                                    { value: 'female', label: 'Female' },
                                    { value: 'other', label: 'Other' }
                                ]}
                                onChange={handleFormChange}
                                error={errors.includes('gender')}
                            />
                        </div>
                        <div>
                            <Input
                                type='select'
                                name='familyHistory'
                                id='familyHistory'
                                label='Family History of hairloss'
                                options={[
                                    { value: '', label: 'Choose option' },
                                    { value: 'yes', label: 'Yes' },
                                    { value: 'no', label: 'No' },
                                ]}
                                onChange={handleFormChange}
                                error={errors.includes('familyHistory')}
                            />
                        </div>
                        <div>
                            <Input
                                type='select'
                                name='stressLevel'
                                id='stressLevel'
                                label='Stress Level'
                                options={[
                                    { value: '', label: 'Choose option' },
                                    { value: 'low', label: 'Low' },
                                    { value: 'medium', label: 'Medium' },
                                    { value: 'high', label: 'High' },
                                ]}
                                onChange={handleFormChange}
                                error={errors.includes('stress')}
                            />
                        </div>

                    </div>
                </div>
                {compError !== '' && <p className='text-red-500 text-center'>{`${compError}, Please reload the page and try with different email`}</p>}
                <div className='flex justify-center mt-[50px]'>
                    <Button
                        type={'submit'}
                        bgColor={'bg-btn'}
                        content={'Analyse'}
                        contentColor={'text-btn-text'}
                        extraClass={`px-[20px] py-[10px] lg:px-[80px] md:px-[50px] md:text-[1.2rem] hover:bg-blue-700 ${isHairfall ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    />
                </div>
            </form>
        </div>
    )
}

export default FormComplex