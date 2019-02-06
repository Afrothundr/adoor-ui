import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { logOut } from '../../../auth/redux/actions/auth.actions';
import Nav from '../Nav/Nav';

const styles = theme => ({
});

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            profile: null
        }
    }

    handleLogOut = () => {
        this.props.logOut()
    }

    render() {
        return(
            <div>
                <Nav />
                <button onClick={this.handleLogOut}>log out</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(logOut())
    }
}

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard));