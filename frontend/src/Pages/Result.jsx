import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Result = () => {
  const [currDate, setCurrDate] = useState('');

  // Use useSelector to access the report, personalDetails, and geneticDetails from Redux store
  const report = useSelector((state) => state.report.report);
  const personalDetails = useSelector((state) => state.form.personalDetails);
  const geneticDetails = useSelector((state) => state.form.geneticDetails);

  useEffect(() => {
    setCurrDate(getCurrentDate());
  }, [])

  function getCurrentDate() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();

    return `${month}/${day}/${year}`;
  }

  function calculateAge(dob) {
    if (!dob) return '';

    const [year, month, day] = dob.split('-').map(Number);
    const dobDate = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - dobDate.getFullYear();

    const monthDiff = today.getMonth() - dobDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }

    return age;
  }

  return (
    <div className='max-w-[600px] bg-blue-200 flex flex-col mx-auto'>
      <div className='flex flex-col px-[30px] py-[30px] gap-y-[20px]'>
        <div className='flex flex-col gap-y-[5px]'>
          <h1 className='text-[2rem]'>Your Personalized Hair Report</h1>
          <h4 className='text-[1rem]'>Based on your Assessment on {currDate}</h4>
        </div>

        {/* Card 1 */}
        <div className='bg-white flex flex-col px-[20px] py-[10px] rounded-[10px]'>
          <h1 className='text-[1.5rem] mb-[25px]'>Patient Information</h1>
          <p className='text-[1.2rem]'><strong>Name: </strong> {personalDetails?.name} </p>
          <p className='text-[1.2rem]'><strong>Age: </strong> {calculateAge(geneticDetails?.dob)} </p>
          <p className='text-[1.2rem]'><strong>Stress Level: </strong> {geneticDetails?.stressLevel} </p>
          <p className='text-[1.2rem]'><strong>Family History of Hair Loss: </strong> {geneticDetails?.familyHistory} </p>
        </div>

        {/* Card 2 */}
        <div className='bg-white flex flex-col px-[20px] py-[10px] rounded-[10px]'>
          <h1 className='text-[1.5rem] mb-[25px]'>Hair Analysis</h1>
          <p className='text-[1.2rem]'><strong>Baldness Stage: </strong> {report.baldnessStage} </p>
          <p className='text-[1.2rem]'><strong>Hair Density: </strong> {report.hairDensity} </p>
          <p className='text-[1.2rem]'><strong>Scalp Condition: </strong> {report.scalpCondition} </p>
          <p className='text-[1.2rem]'><strong>Risk Factor: </strong> {report.riskFactor} </p>
        </div>

        {/* Card 3 */}
        <div className='bg-white flex flex-col px-[20px] py-[10px] rounded-[10px]'>
          <h1 className='text-[1.5rem] mb-[25px]'>Key Observations</h1>
          {report.keyObservations.map((observation, index) => (
            <p key={index} className='text-[1.2rem]'>{observation}</p>
          ))}
        </div>

        {/* Card 4 */}
        <div className='bg-white flex flex-col px-[20px] py-[10px] rounded-[10px]'>
          <h1 className='text-[1.5rem] mb-[25px]'>Recommendations</h1>
          {report.recommendations.map((recommendation, index) => (
            <p key={index} className='text-[1.2rem]'>{recommendation}</p>
          ))}
        </div>

        {/* Card 5 */}
        <div className='bg-[#ff9b29] flex flex-col px-[20px] py-[10px] rounded-[10px] items-center gap-y-[20px]'>
          <h1 className='text-[1.5rem] text-center font-semibold text-white'>Ready to take the next step? Book your free consultation now!</h1>
          <h1 className='text-[1.2rem] text-center text-white line-through'>Limited Time Offer: <span>&#8377;</span>1500 Consultation Fee!</h1>
          <div className='mx-auto bg-green-500 text-white font-bold px-[30px] py-[10px] text-[1.2rem] text-center rounded-[20px]'>
            <p>Book Free Hair Consultation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
