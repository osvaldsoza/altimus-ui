import React from 'react';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import Login from "./components/Login";
import reducers from './reducers/index'

const store = createStore(reducers, applyMiddleware(thunk))

function App() {
    return (
        <Provider store={store}>
            <Login/>
        </Provider>
    );
}

export default App;
