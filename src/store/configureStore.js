import { createStore, combineReducers } from 'redux';
import specReducer from '../reducers/specReducer.js';

// reducer function will look at the dispatched action and 
// return the computed next state.
//

const storedDesigns = JSON.parse(localStorage.getItem('storedDesigns')); 
const latestDesignId = localStorage.getItem('latestDesign');
const latestDesign = JSON.parse(localStorage.getItem(latestDesignId));

const storeDefault = {
    storedDesigns : storedDesigns ? storedDesigns : [],
    loadedDesign : latestDesign ? latestDesign : {},
    filter: ''
};

const configureStore = () => {
    const store = createStore(specReducer, storeDefault, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    return store;

};

export default configureStore;


// here's what can be done/
// load persisted state (list of stored designs) during createStore
// when user tells us which of the designs they want, we can load that piece of data in
// loadedDesign
// so the state in redux will always look something like:
// {
//   storedDesigns: [...],
//   loadedDesign: {...}
// }
