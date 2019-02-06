import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const AuthenticatedRoute = ({ component: Component, authed, ...rest }) => (
    <Route {...rest} render={(props) => (
      authed
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  )