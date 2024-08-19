import { combineReducers } from 'redux';
import fromReducer from '../features/formSlice/formSlice'
import reportReducer from '../features/reportSlice/reportSlice'
// Combine all the reducers into a rootReducer
const rootReducer = combineReducers({
    form: fromReducer,
    report: reportReducer
    // other reducers can be added here
});

export default rootReducer;
