import React from "react";
import NumberFormat from 'react-number-format';
import '../../theme.scss';

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '1rem 1.2rem 0'
}

const headerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
}


export const PreviewHeader = (props) => {
    return (
    <div style={containerStyle}>
        <div style={headerStyle}>
        <NumberFormat value={props.listing.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <h1 style={{color: 'hsla(0, 0%, 17%, 0.75)'}}>{value}</h1>} />
            <h5><i class="fas fa-ruler-combined"></i> {props.listing.squareFootage} ft</h5>
        </div>
        <p>{props.listing.description}</p>
    </div>
    );
}
