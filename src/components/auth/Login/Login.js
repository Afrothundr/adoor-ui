import React from 'react';
import './Login.scss';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import logo from '../../../images/logo.png';

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

export const Login = props => {
    const { classes } = props;
    return (
        <div className="login">
            <img className="login-logo" alt="" src={logo}></img>
            <div>
                <Button className={classes.button}>
                    log in
            </Button>
                <Button color="primary" className={classes.button}>
                    sign up
            </Button>
            </div>
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    label="email"
                    className={classes.textField}
                    value=""
                    margin="normal"
                    variant="filled"
                />
                <TextField
                    label="password"
                    className={classes.textField}
                    type="password"
                    value=""
                    margin="normal"
                    variant="filled"
                />
            </form>

        </div>
    )
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);