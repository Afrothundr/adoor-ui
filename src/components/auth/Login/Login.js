
import './Login.scss';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import logo from '../../../images/logo.png';
import React from 'react';

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
            showSignUpForm: false
        }
    }

    displayForm() {
        const { classes } = this.props;
        const loginForm =
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    label="email"
                    className={classes.textField}

                    margin="normal"
                    variant="filled"
                />
                <TextField
                    label="password"
                    className={classes.textField}
                    type="password"

                    margin="normal"
                    variant="filled"
                />
            </form>
        const signUpForm =
            <form className={classes.container} noValidate autoComplete="off">
                <div>
                    <TextField
                        label="first name"
                        className={classes.textField}
                        margin="normal"
                        variant="filled"
                    />
                    <TextField
                        label="last name"
                        className={classes.textField}

                        margin="normal"
                        variant="filled"
                    />
                </div>
                <div>
                    <TextField
                        label="email"
                        className={classes.textField}

                        margin="normal"
                        variant="filled"
                        type="email"
                    />
                    <TextField
                        label="phone number"
                        className={classes.textField}

                        margin="normal"
                        variant="filled"
                        type="tele"
                    />
                </div>
                <div>
                    <TextField
                        label="password"
                        className={classes.textField}
                        type="password"

                        margin="normal"
                        variant="filled"
                    />
                    <TextField
                        label="confirm password"
                        className={classes.textField}
                        type="password"

                        margin="normal"
                        variant="filled"
                    />
                </div>
            </form>

        return this.state.showLoginForm ? loginForm : signUpForm;
    }

    handleLoginClick() {
        this.setState({ showLoginForm: true, showSignUpForm: false })
    }

    handleSignUpClick() {
        this.setState({ showLoginForm: false, showSignUpForm: true })
    }

    render() {
        const { classes } = this.props;
        const activeStyle = {
            borderBottom: '3px solid #C9283E'
        };
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
                {
                    this.displayForm()
                }
            </div>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);