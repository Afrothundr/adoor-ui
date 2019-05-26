import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import './Manage.scss';
import { loadListings } from '../../redux/actions/dashboard.actions';
import ManageTable from './Manage-Table/Manage-Table';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

class Manage extends React.Component {
    constructor() {
        super();
        this.state = {
            showActiveListings: true
        }
    }

    componentWillMount() {
        this.props.loadListings();
        const paramResult = this.props.match.params.expired === 'active';
        this.setState({
            showActiveListings: paramResult
        })
    }

    toggleTables = linkThatWasClicked => {
        if (linkThatWasClicked === 'active') {
            if (!this.state.showActiveListings)
                this.setState({
                    showActiveListings: !this.state.showActiveListings
                });
        } else {
            if (this.state.showActiveListings)
                this.setState({
                    showActiveListings: !this.state.showActiveListings
                });
        }
    }

    render() {
        return (
            <section className="manage">
                <h1 id="header">Listings</h1>
                <div className="manage-table-actions">
                    <a onClick={() => this.toggleTables('active')}>
                        <h3 className={this.state.showActiveListings ? 'active-color' : 'inactive'}>active</h3>
                    </a>
                    <a onClick={() => this.toggleTables('expired')}>
                        <h3 className={!this.state.showActiveListings ? 'expired-color' : 'inactive'}>expired</h3>
                    </a>
                </div>
                <ManageTable listings={this.state.showActiveListings ? this.props.profile.listings : this.props.profile.expiredListings} />
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        profile: state.dashboardReducer.profile,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loadListings: () => dispatch(loadListings())
    }
}

export default withStyles(styles, { withTheme: true })(connect(
    mapStateToProps,
    mapDispatchToProps)(Manage));