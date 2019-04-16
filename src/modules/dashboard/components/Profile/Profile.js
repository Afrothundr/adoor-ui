
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import ProfileForm from './Profile-Form/Profile-Form';
import './Profile.scss';
import { checkEmail, clearAuthErrors } from '../../../auth/redux/actions/auth.actions';
import { uploadProfile } from '../../redux/actions/dashboard.actions';
import { ProfileActions } from './Profile-Actions/Profile-Actions';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            isEditing: false,
        }
    }

    handleCancelClick = () => {
        this.props.clearAuthErrors();
        this.setState({
            isEditing: !this.state.isEditing
        });
    }

    handleEditClick = () => {
        this.setState({
            isEditing: !this.state.isEditing
        });
    }

    handleProfileSubmit = profile => {
        this.setState({
            isEditing: !this.state.isEditing
        });
        this.props.uploadProfile(profile);
    }

    handleCheckEmail = email => {
        this.props.checkEmail(email);
    }

    formatPhoneNumber = number => {
        if (!number) return null;
        const numArray = number.split('');
        numArray.splice(0, 0, '(');
        numArray.splice(4, 0, ')');
        numArray.splice(5, 0, '-');
        numArray.splice(9, 0, '-');
        return numArray.join('');
    }

    render() {
        const { classes } = this.props;
        return (
            <section className="profile">
                {this.state.isEditing ?
                    <ProfileForm
                        profile={this.props.profile}
                        handleEditClick={this.handleEditClick}
                        handleCancelClick={this.handleCancelClick}
                        handleProfileSubmit={this.handleProfileSubmit}
                        isEmailAvailable={this.props.isEmailAvailable}
                        checkEmail={this.handleCheckEmail}
                        /> :
                    <div className="profile-card">
                        <aside>
                            <div id="profile-pic-container" style={{ backgroundImage: `url("${this.props.profile.profilePicture || "https://feedback.seekingalpha.com/s/cache/7a/4b/7a4bcc11fadeac0bb827e141cb770f56.png"}")` }}>
                            </div>
                        </aside>
                        <article>
                            <h1>{this.props.profile.firstName || '(First Name)'} {this.props.profile.lastName || '(Last Name)'}</h1>
                            <h3>{this.props.profile.title || '(Title)'}</h3>
                            <address>
                                <h5>{this.props.profile.company || '(Company)'}</h5>
                                <h5>{this.formatPhoneNumber(this.props.profile.phoneNumber) || '(Phone Number)'}</h5>
                                <h5>{this.props.profile.email || '(Email)'}</h5>
                            </address>
                            <p>
                                {this.props.profile.bio || ('Add Bio')}
                            </p>
                            <Button variant="contained" color="primary" className={classNames([classes.button, 'lowerCaseButton'])} onClick={this.handleEditClick}>edit</Button>
                        </article>
                    </div>
                }
                { !this.state.isEditing && <ProfileActions profile={this.props.profile} /> }
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        profilePending: state.dashboardReducer.profilePending,
        profileLoadFailed: state.dashboardReducer.profileLoadFailed,
        profile: state.dashboardReducer.profile,
        isEmailAvailable: state.authReducer.isEmailAvailable
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // loadProfile: () => dispatch(loadProfile()),
        // logOut: () => dispatch(logOut()),
        // clearProfile: () => dispatch(clearProfile())
        checkEmail: email => dispatch(checkEmail(email)),
        uploadProfile: profile => dispatch(uploadProfile(profile)),
        clearAuthErrors: () => dispatch(clearAuthErrors())
    }
}

export default withStyles(styles, { withTheme: true })(connect(
    mapStateToProps,
    mapDispatchToProps)(Profile));