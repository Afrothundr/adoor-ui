import React from "react";

const sectionStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: '0 1.2rem'
}

const addressStyle = {
    justifySelf: 'flex-start'
}

const featureStyle = {
    marginLeft: 'auto',
    marginRight: '20px'
}

export const PreviewDetails = (props) => {
    return (
    <section style={sectionStyle}>
        <div style={addressStyle}>
            <h5>{props.listing.address}</h5>
            <h3>{props.listing.city}, MO</h3>
        </div>
        <div style={featureStyle}>
            <h3>{props.listing.bathrooms}   <i class="fas fa-bed"></i></h3>
            <h5>bedrooms</h5>
        </div>
        <div>
            <h3>{props.listing.bathrooms}   <i class="fas fa-toilet"></i></h3>
            <h5>bathrooms</h5>
        </div>
    </section>
    );
}
