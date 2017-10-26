import { Redirect, Route } from 'react-router-dom'
import React from 'react'

export default ({ component: Component, isRegistered, ...rest }) => (
    <Route {...rest} render={(props) => (
        isRegistered ? (
            <Component />
        ) : (
                <Redirect to={{
                    pathname: '/register',
                    state: { from: props.location }
                }} />
            )
    )} />
)