import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Header from './components/Header.js';
import AppRouter from './routers/AppRouter.js';
import configureStore from './store/configureStore.js'; 
import './styles/styles.scss';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));


store.subscribe(() => {
    const spec =  store.getState();
    console.log(spec);
});


// TODO List
// Screen to set costing params
// 
