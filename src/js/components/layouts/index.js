import React from 'react'
import { Route } from 'react-router-dom'
import NotFound from 'app/js/components/screens/not-found'

const Layout = ({ path, component: Component, ...rest }) => {
    return (
        <Route
            exact
            path={path}
            render={props => <Component {...props} /> }
            {...rest}
        />
    )
}

export default Layout
