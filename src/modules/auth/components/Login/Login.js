
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import logo from '../../../../images/logo.png';
import { login, clearAuthErrors, checkEmail, signUp } from '../../redux/actions/auth.actions';
import LoginForm from '../Login-Form/Login-Form';
import SignUpForm from '../Sign-Up-Form/Sign-Up-Form';
import './Login.scss';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});

export class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            showLoginForm: true,
            showSignUpForm: false,
            loadingLogin: false,
            name: '',
            token: '',
            loggedIn: false
        }
    }

    handleLoginClick() {
        this.setState({ showLoginForm: true, showSignUpForm: false })
    }

    handleSignUpClick() {
        this.setState({ showLoginForm: false, showSignUpForm: true })
    }

    handleLogin = (email, password) => {
        this.props.login(email, password);
    }

    handleCheckEmail = email => {
        this.props.checkEmail(email);
    }

    handleSignUp = seller => {
        this.props.signUp(seller);
    }

    render() {
        const { classes } = this.props;
        const activeStyle = {
            borderBottom: '3px solid #C9283E'
        };
        if (this.props.token) {
            return <Redirect to='/dashboard' />
        }
        return (
            <div className="login">
                <img className="login-logo" alt="" src={logo}></img>
                <div>
                    <Button style={this.state.showLoginForm ? activeStyle : {}} className={classes.button} onClick={this.handleLoginClick.bind(this)}>
                        log in
                    </Button>
                    <Button style={this.state.showSignUpForm ? activeStyle : {}} className={classes.button} onClick={this.handleSignUpClick.bind(this)}>
                        sign up
                    </Button>
                </div>
                <div>
                    {
                        this.state.showLoginForm ?
                            <LoginForm 
                                hidden={this.state.showLoginForm}
                                handleLogin={this.handleLogin}
                                loginFailed={this.props.loginFailed}
                                isLoading={this.props.isLoading}
                                clearAuthErrors={this.props.clearAuthErrors} /> :
                            <SignUpForm 
                                hidden={!this.state.showLoginForm}
                                checkEmail={this.handleCheckEmail}
                                isEmailAvailable={this.props.isEmailAvailable}
                                isLoading={this.props.isSignUpLoading}
                                signUpFailed={this.props.signUpFailed}
                                handleSignUp={this.handleSignUp}
                             />
                    }
                </div>
                {(this.props.loginFailed && !this.props.isLoading) && 
                <div className="login-failure-message">
                    <h4>Login Failed!</h4>
                    <p>Username or password is incorrect</p>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.authReducer);
    return {
        token: state.authReducer.token,
        isLoading: state.authReducer.loginPending,
        isSignUpLoading: state.authReducer.signUpPending,
        signUpFailed: state.authReducer.signUpFailed,
        loginFailed: state.authReducer.loginFailed,
        isEmailAvailable: state.authReducer.isEmailAvailable
    }
    
}
const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(login(email, password)),
        clearAuthErrors: () => dispatch(clearAuthErrors()),
        checkEmail: email => dispatch(checkEmail(email)),
        signUp: seller => dispatch(signUp(seller))
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(Login));