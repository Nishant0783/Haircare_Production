import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    report: {
        baldnessStage: '',
        hairDensity: '',
        keyObservations: [],
        recommendations: [],
        riskFactor: '',
        scalpCondition: ''
    }
}

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        setReport(state, action) {
            state.report = action.payload;
        }
    }
});

export const { setReport } = reportSlice.actions;
export default reportSlice.reducer