import { Redirect, Route } from 'react-router-dom'
import React from 'react'

export default ({ component: Component, isTrue, redirectPath, ...rest }) => (
    <Route {...rest} render={(props) => (
        isTrue ? (
            <Component />
        ) : (
                <Redirect to={{
                    pathname: redirectPath,
                    state: { from: props.location }
                }} />
            )
    )} />
)