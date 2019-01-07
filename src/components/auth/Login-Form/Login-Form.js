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

const LoginForm = (props) => {
    const { classes } = props;
    return (
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
        <Button color="primary" variant="contained" className={classes.button}>
            submit
        </Button>
        </form>
    );
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);