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


class SignUpForm extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            email: ''
        }
    }
    handleEmailChange = () => {

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        if (this.state.email) {
            setTimeout(() => {
                this.props.checkEmail(this.state.email);
            }, 500)
        }
    }
    render() {
        const { classes } = this.props;
        const formValues = this.state;
        return (
            <form className={classes.container} autoComplete="off">
                <div>
                    <TextField
                        label="first name"
                        className={classes.textField}
                        margin="normal"
                        variant="filled"
                        name="firstName"
                        value={formValues.firstName}
                        onChange={this.onChange}
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
                        name="email"
                        autoComplete="off"
                        className={classes.textField}
                        error={!this.props.isEmailAvailable}
                        helperText={!this.props.isEmailAvailable && 'this email is alread registered'}
                        margin="normal"
                        variant="filled"
                        type="email"
                        value={formValues.email}
                        onChange={this.onChange}
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
                <Button color="primary" variant="contained" className={classes.button}>
                    submit
            </Button>
            </form>
        );
    }
}

SignUpForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUpForm);