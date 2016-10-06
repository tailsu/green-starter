import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'
import {Provider} from 'react-redux'
import {store} from '$store'
import App from '$app'
import {initializeAutoStore} from './state/horizon'

import './styles'

initializeAutoStore(store, ['foos']);

const routes =
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={App} />
        </Router>
    </Provider>

ReactDOM.render(routes, document.getElementById('starter-react-root'));
