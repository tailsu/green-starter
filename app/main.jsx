import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'
import {Provider} from 'react-redux'
import {store} from './state/store'
import App from './app'

import './styles'

const routes =
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={App} />
        </Router>
    </Provider>

ReactDOM.render(routes, document.getElementsByClassName('starter-react-root')[0]);
