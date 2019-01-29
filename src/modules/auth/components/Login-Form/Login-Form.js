import React from 'react';
import './Login-Form.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    loginFormSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.handleLogin(email, password)
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { classes } = this.props;
        const { email, password } = this.state;
        return (
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.loginFormSubmit}>
                <TextField
                    label="email"
                    name="email"
                    className={classes.textField}
                    value={email}
                    onChange={this.onChange}
                    margin="normal"
                    variant="filled"
                />
                <TextField
                    label="password"
                    name="password"
                    className={classes.textField}
                    type="password"
                    value={password}
                    onChange={this.onChange}
                    margin="normal"
                    variant="filled"
                />
                {
                    this.props.showButton &&
                    <Button type="submit" color="primary" variant="contained" className={classes.button} >
                            submit
                    </Button>
                }
            </form>
        );
    };
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);