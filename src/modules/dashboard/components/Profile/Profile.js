
import React from 'react';
import './Profile.scss';
import { withStyles } from '@material-ui/core';

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: null,
            lastName: null,
            phoneNumber: null,
            bio: null,
            email: null,
            company: null,
            title: null,
            profilePicture: null
        }
    }

    render() {
        return (
            <section>
                <div>
                    <aside>
                        <img alt="profile-pic" src="https://feedback.seekingalpha.com/s/cache/7a/4b/7a4bcc11fadeac0bb827e141cb770f56.png"></img>
                    </aside>
                    <article>
                        <h1>Gilberto Rivera</h1>
                        <h3>indepedent contractor</h3>
                    </article>
                </div>
            </section>
        )
    }
}

export default withStyles(null, { withTheme: true })(Profile);