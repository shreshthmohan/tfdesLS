import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import specReducer from '../reducers/spec.js';
import designListReducer from '../reducers/designList.js';

// reducer function will look at the dispatched action and 
// return the computed next state.

//const storedDesigns = JSON.parse(localStorage.getItem('storedDesigns')); 

//const storeDefault = {
//    storedDesigns : storedDesigns ? storedDesigns : [],
//    loadedDesign : {}
//};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
    const store = createStore(
        combineReducers({
            loadedDesign: specReducer,
            storedDesigns: designListReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
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
