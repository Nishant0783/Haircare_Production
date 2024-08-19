import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    personalDetails: {
        name: '',
        email: '',
        number: '',
    },
    step: 1,
    isHairfall: false,
    geneticDetails: {
        dob: '',
        gender: '',
        familyHistory: '',
        stressLevel: ''
    }
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setPersonalDetails: (state, action) => {
            state.personalDetails = action.payload;
        },
        setStep: (state, action) => {
            state.step = action.payload;
        },
        setHairfall: (state, action) => {
            state.isHairfall = action.payload;
        },
        setGeneticDetails: (state, action) => {
            state.geneticDetails = action.payload;
        }
    },
});

export const { setPersonalDetails, setStep, setHairfall, setGeneticDetails } = formSlice.actions;
export default formSlice.reducer;
