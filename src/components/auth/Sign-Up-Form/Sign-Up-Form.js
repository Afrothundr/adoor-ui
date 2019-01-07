import React from 'react';
import './Sign-Up-Form.scss';
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

const SignUpForm = (props) => {
    const { classes } = props;
    return (
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
                        type="tel"
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
        <Button color="primary"  variant="contained" className={classes.button}>
            submit
        </Button>
        </form>
    );
}

SignUpForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUpForm);