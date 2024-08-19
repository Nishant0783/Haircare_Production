const validateForm = (formData) => {
    const errors = [];

    for (const key in formData) {
        console.log("Inside validate form")
        const value = formData[key];

        // Check if the value is an object or an empty string
        if (typeof value === 'string') {
            if (value.trim() === '') {
                errors.push(key);
            }
        } else if (!value) {
            // For non-string values, just check if they are falsy (null, undefined, etc.)
            errors.push(key);
        }
    }

    return errors;
}

export { validateForm }
