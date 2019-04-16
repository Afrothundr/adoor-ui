import React from 'react';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import InputMask from 'react-input-mask';

import './Profile-Form.scss';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

class ProfileForm extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            bio: '',
            email: '',
            company: '',
            title: '',
            profilePicture: '',
            isDirty: {
                firstName: false,
                lastName: false,
                phoneNumber: false,
                bio: false,
                email: false,
                company: false,
                title: false,
                profilePicture: false,
            },
            formErrors: {
                firstName: '',
                lastName: '',
                phoneNumber: '',
                bio: '',
                email: '',
                company: '',
                title: '',
                profilePicture: ''
            },
            validators: {
                firstNameValid: true,
                lastNameValid: true,
                phoneNumberValid: true,
                bioValid: true,
                emailValid: true,
                companyValid: true,
                titleValid: true,
                profilePictureValid: true,
            },
            formValid: true
        }
    }

    componentWillMount = () => {
        this.setState({
            firstName: this.props.profile.firstName || '',
            lastName: this.props.profile.lastName || '',
            phoneNumber: this.props.profile.phoneNumber || '',
            bio: this.props.profile.bio || '',
            email: this.props.profile.email || '',
            company: this.props.profile.company || '',
            title: this.props.profile.title || '',
            profilePicture: this.props.profile.profilePicture || '',
        });
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

    validateForm() {
        const isFormVaild = Object.entries(this.state.validators).map(keyValPair => keyValPair[1]);
        this.setState({ formValid: isFormVaild.every(e => e) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let firstNameValid = this.state.validators.firstNameValid;
        let lastNameValid = this.state.validators.lastNameValid;
        let phoneNumberValid = this.state.validators.phoneNumberValid;
        let emailValid = this.state.validators.emailValid;
        let bioValid = this.state.validators.bioValid;
        let companyValid = this.state.validators.companyValid;
        let titleValid = this.state.validators.titleValid;
        let profilePictureValid = this.state.validators.profilePictureValid;

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
            case 'bio':
                bioValid = value !== '' && value.split('').length < 280;
                fieldValidationErrors.bio = bioValid ? '' : 'bio cannot have more than 280 characters';
                break;
            case 'company':
                companyValid = value !== '';
                fieldValidationErrors.company = companyValid ? '' : 'company cannot be empty';
                break;
            case 'title':
                titleValid = value !== '';
                fieldValidationErrors.title = titleValid ? '' : 'title cannot be empty';
                break;
            case 'profilePicture':
                profilePictureValid = value !== '';
                fieldValidationErrors.profilePicture = profilePictureValid ? '' : 'please choose a profile picture';
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            validators: {
                firstNameValid: firstNameValid,
                lastNameValid: lastNameValid,
                phoneNumberValid: phoneNumberValid,
                emailValid: emailValid,
                bioValid: bioValid,
                companyValid: companyValid,
                titleValid: titleValid,
                profilePictureValid: profilePictureValid
            }
        }, this.validateForm);
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

    profileFormSubmit = event => {
        event.preventDefault();
        // for number format stripping
        const numberPattern = /\d+/g;
        const profile = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber.match(numberPattern).join([]),
            company: this.state.company,
            title: this.state.title,
            profilePicture: this.state.profilePicture,
            bio: this.state.bio
        }
        this.props.handleProfileSubmit(profile);
        console.log(profile);
    }

    render() {
        const { classes } = this.props;
        const formValues = this.state;
        return (
            <div className="profile-form">
            <h1>Edit Profile</h1>
                <form onSubmit={this.profileFormSubmit}>
                    <div className="profile-form-rows">
                        <TextField
                            label="first name"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
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
                            variant="outlined"
                            helperText={this.state.formErrors.lastName}
                            error={!this.state.validators.lastNameValid && this.state.isDirty.lastName}
                        />
                    </div>
                    <div className="profile-form-rows">
                        <TextField
                            label="email"
                            name="email"
                            autoComplete="off"
                            className={classes.textField}
                            error={(!this.state.validators.emailValid || !this.props.isEmailAvailable) && this.state.isDirty.email}
                            helperText={this.getEmailErrorMessage()}
                            margin="normal"
                            variant="outlined"
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
                                variant="outlined"
                                type="tel"

                            />}
                        </InputMask>
                    </div>
                    <div className="profile-form-rows">
                    <TextField
                            label="company"
                            name="company"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={formValues.company}
                            onChange={this.onChange}
                            helperText={this.state.formErrors.company}
                            error={!this.state.validators.companyValid && this.state.isDirty.company}>
                        </TextField>
                        <TextField
                            label="title"
                            name="title"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={formValues.title}
                            onChange={this.onChange}
                            helperText={this.state.formErrors.title}
                            error={!this.state.validators.titleValid && this.state.isDirty.title}>
                        </TextField>
                    </div>
                    <div className="profile-form-rows full-length">
                    <TextField
                            label="profile picture"
                            name="profilePicture"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={formValues.profilePicture}
                            onChange={this.onChange}
                            helperText={this.state.formErrors.profilePicture}
                            error={!this.state.validators.profilePictureValid && this.state.isDirty.profilePicture}>
                        </TextField>
                    </div>
                    <div className="profile-form-rows full-length">
                    <TextField
                            label="bio"
                            name="bio"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={formValues.bio}
                            onChange={this.onChange}
                            multiline={true}
                            helperText={this.state.formErrors.bio}
                            error={!this.state.validators.bioValid && this.state.isDirty.bio}>
                        </TextField>
                    </div>

                    <div className="profile-form-actions">
                        <Button className={classNames([classes.button, 'lowerCaseButton'])} onClick={this.props.handleCancelClick} type="button">cancel</Button>
                        <Button variant="contained" color="primary" className={classNames([classes.button, 'lowerCaseButton'])} disabled={!this.state.formValid} type="submit">submit</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(ProfileForm)