import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Header from './components/Header.js';
import AppRouter from './routers/AppRouter.js';
import configureStore from './store/configureStore.js'; 
import { startLoadDesignList } from './actions/spec.js';

import './firebase/firebase';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

ReactDOM.render(<p>Loading ... </p>, document.getElementById('app'));

// dispatch returns a promise because startLoadDesignList is 
// a function that returns a promise
// dispatch basically returns the action object that was passed to it
store.dispatch(startLoadDesignList()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'));
});


store.subscribe(() => {
    const spec =  store.getState();
    console.log(spec);
});


// TODO
// render app after loading storeDefault from firebase realtime database
// until then just render 'loading'
