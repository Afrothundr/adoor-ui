import { ManageTableRow } from './components/Manage-Table-Row';
import React from 'react';
import './Manage-Table.scss';

class ManageTable extends React.Component {
    handleRowClick = (id) => {
        this.props.navigateToEditPage(id);
    }
    render = () => {
        return (
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
                    {this.props.listings && this.props.listings.map(listing => 
                           <ManageTableRow listing={listing}  handleRowClick={this.handleRowClick}/>
                    )}
                </div>
            </div>
        )
    }
}

export default ManageTable;