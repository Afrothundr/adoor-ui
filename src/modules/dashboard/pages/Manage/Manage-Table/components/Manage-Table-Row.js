import React from "react";
import NumberFormat from 'react-number-format';
import * as moment from 'moment';

export const ManageTableRow = ({ listing, handleRowClick}) => (
     <div className="manage-table-row" key={listing.id} onClick={() => handleRowClick(listing.id)}>
        <div className="manage-table-cell picture">
            <div style={{
                backgroundImage: `url("${listing.pictures && listing.pictures[0]}")`
            }}></div>
        </div>
        <div className="manage-table-cell address">
            <p>{listing.address}</p>
        </div>
        <div className="manage-table-cell price">
            <NumberFormat value={listing.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p>{value}</p>} />
            <p>{listing.lowPrice && listing.lowPrice.toString().substring(0, listing.lowPrice.toString().length - 3) + ' K'} {listing.highPrice && '-' + listing.highPrice.toString().substring(0, listing.highPrice.toString().length - 3) + ' K'}
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
);
