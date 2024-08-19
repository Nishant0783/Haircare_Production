import React, { forwardRef, useState } from 'react';

const Input = forwardRef((
    {
        type = "text",
        id,
        label,
        options = [],
        inputClass = "",
        error = false,
        ...props
    },
    ref // This ref will be forwarded to the input element
) => {
    const [isInOption, setIsInOption] = useState(false);

    return (
        <div className="relative z-0 text-content font-content font-semibold md:text-[1.5rem] text-[1rem] w-full">
            {type === "select" ? (
                <div>
                    <label
                        htmlFor={id}
                        className={`block mb-2 transition-colors duration-300 text-[1rem] ${isInOption ? 'text-black' : 'text-label'} ${error && 'text-red-500'}`}
                    >
                        {label}
                    </label>
                    <select
                        id={id}
                        className={`block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-gray-600 bg-white text-gray-700 text-[1rem] peer ${inputClass}`}
                        onFocus={() => setIsInOption(true)}
                        onBlur={() => setIsInOption(false)}
                        ref={ref} // Forward ref here
                        {...props}
                    >
                        {options.map((option, index) => (
                            <option
                                key={index}
                                value={option.value || option}
                                className="text-gray-700 text-[1rem]"
                            >
                                {option.label || option}
                            </option>
                        ))}
                    </select>
                </div>
            ) : type === "radio" || type === "checkbox" ? (
                <div className="flex flex-col text-[1rem]">
                    <label className={`block mb-2 ${error ? 'text-red-500' : 'text-label'}`}>
                        {label}
                    </label>
                    <div className="flex flex-row flex-wrap">
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center mr-4 mb-2">
                                <input
                                    type={type}
                                    id={`${id}-${index}`}
                                    name={id} // Use `name` instead of `id`
                                    value={option.value || option}
                                    className={`mr-2 ${inputClass}`}
                                    ref={ref} // Forward ref here
                                    {...props}
                                />
                                <label htmlFor={`${id}-${index}`} className="text-[1rem]">
                                    {option.label || option}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={`${type === 'date' && 'text-[1.2rem]'}`}>
                    <input
                        type={type}
                        id={id}
                        className={`block py-2.5 px-0 w-full bg-transparent border-0 border-b-[3px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer ${error && 'border-red-500'}`}
                        placeholder=" "
                        ref={ref} // Forward ref here
                        {...props}
                    />
                    <label
                        htmlFor={id}
                        className={`absolute  duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:text-content peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 sm:peer-focus:-translate-y-8 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ${error ? 'text-red-500' : 'text-label'}`}
                    >
                        {label}
                    </label>
                </div>
            )}
        </div>
    );
});

export default Input;
