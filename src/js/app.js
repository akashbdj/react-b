import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import configureStore from 'app/js/store'
import Routes from 'app/js/utils/routes'
import Layout from 'app/js/components/layouts'
import NotFound from 'app/js/components/screens/not-found'
import 'app/css/main.scss'

let PerfProfiler = null
if (process.env.NODE_ENV !== 'production') {
    PerfProfiler = require('app/js/performance').default
}

const initialState = {}
const store = configureStore(initialState)

const App = () => {
    return (
        <Provider store = {store}>
            <Router>
                <div>
                    { PerfProfiler ? <PerfProfiler /> : null }
                    {Routes.map((route, index) => (
                        <Layout key={index} {...route} />
                    ))}
                </div>
            </Router>
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))
