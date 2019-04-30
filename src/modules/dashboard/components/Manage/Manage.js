import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import './Manage.scss';
import { loadListings } from '../../redux/actions/dashboard.actions';
import NumberFormat from 'react-number-format';
import * as moment from 'moment';

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
        const { classes } = this.props;
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
                <div className="manage-table">
                    <div className="manage-table-head">
                        <div className="manage-table-row">
                            <div className="manage-table-cell picture"></div>
                            <div className="manage-table-cell address">address</div>
                            <div className="manage-table-cell price">price</div>
                            <div className="manage-table-cell sqft">sqft</div>
                            <div className="manage-table-cell bed">bed</div>
                            <div className="manage-table-cell bath">bath</div>
                            <div className="manage-table-cell activity">activty</div>
                            <div className="manage-table-cell created">created</div>
                            <div className="manage-table-cell updated">updated</div>
                        </div>
                    </div>
                    <div className="manage-table-body">
                        {this.props.profile.listings && this.props.profile.listings.map(listing => {
                            return (
                                <div className="manage-table-row" key={listing.id}>
                                    <div className="manage-table-cell picture">
                                        <div style={{ backgroundImage: `url("${listing.pictures && listing.pictures[0]}")` }}></div>
                                    </div>
                                    <div className="manage-table-cell address">
                                        <p>{listing.address}</p>
                                    </div>
                                    <div className="manage-table-cell price">
                                    <NumberFormat value={listing.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p>{value}</p>} />
                                    <p>{
                                        listing.lowPrice && listing.lowPrice.toString().substring(0, listing.lowPrice.toString().length -3) + ' K'
                                        } {
                                            listing.highPrice && '-' + listing.highPrice.toString().substring(0, listing.highPrice.toString().length -3) + ' K' 
                                        }
                                    </p>
                                    </div>
                                    <div className="manage-table-cell sqft">
                                        <p>{listing.squareFootage}</p>
                                    </div>
                                    <div className="manage-table-cell bed">
                                        <p>{listing.bedrooms}</p>
                                    </div>
                                    <div className="manage-table-cell bath">
                                        <p>{listing.bathrooms}</p>
                                    </div>
                                    <div className="manage-table-cell activity">
                                        <p>{listing.matches && listing.matches.length} matches</p>
                                        <p>{listing.views} views</p>
                                    </div>
                                    <div className="manage-table-cell created">
                                        <p>{moment.utc(listing.created).format('dddd MMMM Do YYYY')}</p>
                                    </div>
                                    <div className="manage-table-cell updated">
                                    <p>{moment.utc(listing.updated).format('dddd MMMM Do YYYY')}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
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