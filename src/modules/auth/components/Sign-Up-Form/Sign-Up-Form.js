import React from 'react';
import './Sign-Up-Form.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import  CircularProgress from '@material-ui/core/CircularProgress';

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
    buttonProgress: {
        marginTop: -45,
    },
});


class SignUpForm extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
            confirmPassword: '',
            isDirty: {
                firstName: false,
                lastName: false,
                phoneNumber: false,
                email: false,
                password: false,
                confirmPassword: false,
            },
            formErrors: {
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
            validators: {
                firstNameVaild: false,
                lastNameValid: false,
                phoneNumberValid: false,
                emailValid: false,
                passwordValid: false,
                confirmPasswordValid: false,
            },
            formValid: false
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
            isDirty: {
                ...this.state.isDirty,
                [e.target.name]: true
            }
        }, this.validateField(e.target.name, e.target.value));
        if (e.target.name === 'email') {
            setTimeout(() => {
                this.props.checkEmail(this.state.email);
            }, 500)
        }
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let firstNameValid = this.state.validators.firstNameVaild;
        let lastNameValid = this.state.validators.lastNameValid;
        let phoneNumberValid = this.state.validators.phoneNumberValid;
        let emailValid = this.state.validators.emailValid;
        let passwordValid = this.state.validators.passwordValid;
        let confirmPasswordValid = this.state.validators.confirmPasswordValid;

        switch (fieldName) {
            case 'firstName':
                firstNameValid = value !== '';
                fieldValidationErrors.firstName = firstNameValid ? '' : 'first name cannot be empty';
                break;
            case 'lastName':
                lastNameValid = value !== '';
                fieldValidationErrors.lastName = lastNameValid ? '' : 'last name cannot be empty';
                break;
            case 'phoneNumber':
                phoneNumberValid = value !== '' && value.length === 14;
                fieldValidationErrors.phoneNumber = phoneNumberValid ? '' : 'phone number must be 10 digits';
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null;
                fieldValidationErrors.email = emailValid && this.props.isEmailAvailable ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            case 'confirmPassword':
                confirmPasswordValid = value === this.state.password;
                fieldValidationErrors.confirmPassword = confirmPasswordValid ? '' : ' password does not match';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            validators: {
                firstNameVaild: firstNameValid,
                lastNameValid: lastNameValid,
                phoneNumberValid: phoneNumberValid,
                emailValid: emailValid,
                passwordValid: passwordValid,
                confirmPasswordValid: confirmPasswordValid
            }
        }, this.validateForm);
    }

    validateForm() {
        const isFormVaild = Object.entries(this.state.validators).map(keyValPair => keyValPair[1]);
        this.setState({ formValid: isFormVaild.every(e => e) });
    }

    getEmailErrorMessage() {
        if (!this.props.isEmailAvailable) {
            return 'this email is alread registered';
        } else if (!this.state.validators.emailValid) {
            return this.state.formErrors.email;
        } else {
            return '';
        }
    }

    signUpFormSubmit = event => {
        event.preventDefault();
        // for number format stripping
        const numberPattern = /\d+/g;
        const seller = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber.match(numberPattern).join([]),
            password: this.state.password
        }
        this.props.handleSignUp(seller);
        console.log(seller);
    }

    render() {
        const { classes } = this.props;
        const formValues = this.state;
        return (
            <form className={classes.container} autoComplete="off" onSubmit={this.signUpFormSubmit}>
                <div>
                    <TextField
                        label="first name"
                        className={classes.textField}
                        margin="normal"
                        variant="filled"
                        name="firstName"
                        value={formValues.firstName}
                        onChange={this.onChange}
                        helperText={this.state.formErrors.firstName}
                        error={!this.state.validators.firstNameVaild && this.state.isDirty.firstName}
                    />
                    <TextField
                        label="last name"
                        name="lastName"
                        className={classes.textField}
                        value={formValues.lastName}
                        onChange={this.onChange}
                        margin="normal"
                        variant="filled"
                        helperText={this.state.formErrors.lastName}
                        error={!this.state.validators.lastNameValid && this.state.isDirty.lastName}
                    />
                </div>
                <div>
                    <TextField
                        label="email"
                        name="email"
                        autoComplete="off"
                        className={classes.textField}
                        error={(!this.state.validators.emailValid || !this.props.isEmailAvailable) && this.state.isDirty.email}
                        helperText={this.getEmailErrorMessage()}
                        margin="normal"
                        variant="filled"
                        type="email"
                        value={formValues.email}
                        onChange={this.onChange}
                    />
                    <InputMask
                        mask="(999)-999-9999"
                        value={formValues.phoneNumber}
                        onChange={this.onChange}
                        className={this.props.classes.textField}
                    >
                        {() => <TextField
                            label="phone number"
                            name="phoneNumber"
                            className={classes.textField}
                            margin="normal"
                            variant="filled"
                            type="tel"

                        />}
                    </InputMask>
                </div>
                <div>
                    <TextField
                        label="password"
                        name="password"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        variant="filled"
                        value={formValues.password}
                        onChange={this.onChange}
                        helperText={this.state.formErrors.password}
                        error={!this.state.validators.passwordValid && this.state.isDirty.password}
                    />
                    <TextField
                        label="confirm password"
                        name="confirmPassword"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        variant="filled"
                        value={formValues.confirmPassword}
                        onChange={this.onChange}
                        helperText={this.state.formErrors.confirmPassword}
                        error={!this.state.validators.confirmPasswordValid && this.state.isDirty.confirmPassword}
                    />
                </div>
                <Button type="submit" color="primary" variant="contained" className={classes.button} disabled={!this.state.formValid || this.props.isLoading}>
                    let's do this!
                </Button>
                {this.props.isLoading && <CircularProgress className={classes.buttonProgress} />}
            </form>
        );
    }
}

SignUpForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUpForm);