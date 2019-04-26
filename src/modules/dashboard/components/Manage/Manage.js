import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import './Manage.scss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#F2F2F2',
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

class Manage extends React.Component {
    constructor() {
        super();
        this.state = {
            showActiveListings: true
        }
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
                            <div className="manage-table-cell activiy">activty</div>
                            <div className="manage-table-cell created">created</div>
                            <div className="manage-table-cell updated">updated</div>
                        </div>
                    </div>
                    <div className="manage-table-body">
                        <div className="manage-table-row">
                            <div className="manage-table-cell picture"></div>
                            <div className="manage-table-cell address">address</div>
                            <div className="manage-table-cell price">price</div>
                            <div className="manage-table-cell sqft">sqft</div>
                            <div className="manage-table-cell bed">bed</div>
                            <div className="manage-table-cell activiy">activty</div>
                            <div className="manage-table-cell created">created</div>
                            <div className="manage-table-cell updated">updated</div>
                        </div>
                    </div>
                </div>
                {/* <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell align="left"></CustomTableCell>
                            <CustomTableCell align="left">address</CustomTableCell>
                            <CustomTableCell align="right">price</CustomTableCell>
                            <CustomTableCell align="right">sqft</CustomTableCell>
                            <CustomTableCell align="right">bed</CustomTableCell>
                            <CustomTableCell align="right">bath</CustomTableCell>
                            <CustomTableCell align="right">activty</CustomTableCell>
                            <CustomTableCell align="right">created</CustomTableCell>
                            <CustomTableCell align="right">updated</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                        <CustomTableCell align="left"></CustomTableCell>
                            <CustomTableCell align="left">address</CustomTableCell>
                            <CustomTableCell align="right">price</CustomTableCell>
                            <CustomTableCell align="right">sqft</CustomTableCell>
                            <CustomTableCell align="right">bed</CustomTableCell>
                            <CustomTableCell align="right">bath</CustomTableCell>
                            <CustomTableCell align="right">activty</CustomTableCell>
                            <CustomTableCell align="right">created</CustomTableCell>
                            <CustomTableCell align="right">updated</CustomTableCell>
                        </TableRow>
                    </TableBody>
                </Table> */}

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
    }
}

export default withStyles(styles, { withTheme: true })(connect(
    mapStateToProps,
    mapDispatchToProps)(Manage));