
import './Login.scss';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import logo from '../../../../images/logo.png';
import React from 'react';
import LoginForm from '../Login-Form/Login-Form';
import SignUpForm from '../Sign-Up-Form/Sign-Up-Form';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { login } from '../../redux/actions/auth.actions';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        this.setState({ loadingLogin: true })
        this.props.login(email, password);

        setTimeout(() => {
            console.log(this.props);
        }, 1000);
        this.setState({ loggedIn: true });
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
                            <LoginForm hidden={this.state.showLoginForm} handleLogin={this.handleLogin} showButton={!this.props.isLoading} /> :
                            <SignUpForm hidden={!this.state.showLoginForm} />
                    }
                </div>
                {this.props.isLoading && <CircularProgress className={classes.progress} />}
                {(this.props.loginFailed && !this.props.isLoading) && 
                <div>
                    <h4>Login Failed!</h4>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.authReducer.token,
        isLoading: state.authReducer.loginPending,
        loginFailed: state.authReducer.loginFailed
    }
}
const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(login(email, password))
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(Login));