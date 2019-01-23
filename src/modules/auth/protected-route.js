import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      props.token
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  )

  const mapStateToProps = function(state) {
    return {
      token: state.authReducer.token
    }
  }
  
  export default connect(mapStateToProps)(AuthenticatedRoute);