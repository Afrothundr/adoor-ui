import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { logOut } from '../../../auth/redux/actions/auth.actions';

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
                <h1>Hello World</h1>
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