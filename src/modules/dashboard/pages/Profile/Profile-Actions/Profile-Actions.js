import React from 'react';
import './Profile-Actions.scss'
import Badge from '@material-ui/core/Badge';
import { Link } from 'react-router-dom';

export const ProfileActions = props => {
    console.log(props)
    return (
        <div className="profile-actions">
            <div className="profile-actions-cards">
                <Link component={Link} to={{
                    pathname: '/dashboard/manage',
                    state: {
                        showActiveListings: true
                    }
                }}><h1 className="active-listing">{props.listings.length || 0}</h1> </Link>
                <div>
                    <h3>active</h3>
                    <h3>listings</h3>
                </div>
            </div>
            <div className="profile-actions-cards">
                <Link component={Link} to={{
                    pathname: '/dashboard/manage',
                    state: {
                        showActiveListings: false
                    }
                }}><h1 className="expired-listing">{props.expiredListings.length || 0}</h1></Link>
                <div>
                    <h3>expired</h3>
                    <h3>listings</h3>
                </div>
            </div>
            <div className="profile-actions-cards" id="messages">
                <Link component={Link} to="/dashboard/messages" >
                    <Badge badgeContent={0} color="primary">
                        <i className="far fa-comments fa-4x"></i>
                    </Badge>
                </Link>
                <div id="messages-content">
                    <h3>new</h3>
                    <h3>messages</h3>
                </div>
            </div>

        </div >
    );
}