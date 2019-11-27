import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

//Middlewares
import promise from 'redux-promise' //Permite excução de chamadas assíncronas
import multi from 'redux-multi' //Permite disparar mais de uma ação ao mesmo tempo
import thunk from 'redux-thunk' //Permite disparar mais de uma ação de maneira assíncrona

import reducers from './main/reducers'

import App from './main/app'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
                     && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(thunk, multi, promise)(createStore)(reducers, devTools)

ReactDOM.render(
     <Provider store={store}>
        <App />
     </Provider>
    , 
    document.getElementById('app'))