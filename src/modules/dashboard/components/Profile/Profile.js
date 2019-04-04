
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import ProfileForm from './Profile-Form/Profile-Form';
import './Profile.scss';
import { checkEmail } from '../../../auth/redux/actions/auth.actions';

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

    handleEditClick = () => {
        this.setState({
            isEditing: !this.state.isEditing
        });
    }

    handleCheckEmail = email => {
        this.props.checkEmail(email);
    }

    render() {
        const { classes } = this.props;
        return (
            <section className="profile">
                {this.state.isEditing ? <ProfileForm profile={this.props.profile} handleEditClick={this.handleEditClick} isEmailAvailable={this.props.isEmailAvailable} checkEmail={this.handleCheckEmail} /> :
                    <div className="profile-card">
                        <aside>
                            <img alt="profile-pic" src={this.props.profile.profilePicture || "https://feedback.seekingalpha.com/s/cache/7a/4b/7a4bcc11fadeac0bb827e141cb770f56.png"}></img>
                        </aside>
                        <article>
                            <h1>{this.props.profile.firstName || '(First Name)'} {this.props.profile.lastName || '(Last Name)'}</h1>
                            <h3>{this.props.profile.title || '(Title)'}</h3>
                            <address>
                                <h5>{this.props.profile.phoneNumber || '(Phone Number)'}</h5>
                                <h5>{this.props.profile.email || '(Email)'}</h5>
                                <h5>{this.props.profile.company || '(Company)'}</h5>
                            </address>
                            <p>
                                {this.props.profile.bio || ('Add Bio')}
                            </p>
                            <Button variant="contained" color="primary" className={classNames([classes.button, 'lowerCaseButton'])} onClick={this.handleEditClick}>edit</Button>
                        </article>
                    </div>
                }
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
    }
}

export default withStyles(styles, { withTheme: true })(connect(
    mapStateToProps,
    mapDispatchToProps)(Profile));