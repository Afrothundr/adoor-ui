import React from "react";

const sectionStyle = {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px 10px'
}

const innerSectionStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
}

const iconStyle = {
    marginRight: '15px',
    width: '35px',
    display: 'flex',
    justifyContent: 'center'
}

const labelStyle = {
    margin: 0,
    opacity: .7
}

const dataStyle = {
    fontSize: '1rem',
    margin: '0 0 2px'
}

export const PreviewExpansion = (props) => {
    return (
        <section style={sectionStyle}>
            <div style={innerSectionStyle}>
                <div style={iconStyle}>
                    <h3><i class="fas fa-fire-alt fa-lg"></i></h3>
                </div>
                <div>
                    <h3 style={dataStyle}>{props.listing.heating}</h3>
                    <h5 style={labelStyle}>heating</h5>
                </div>
            </div>
            <div style={innerSectionStyle}>
                <div style={iconStyle}>
                    <h3><i class="fas fa-snowflake fa-lg"></i></h3>
                </div>
                <div>
                    <h3 style={dataStyle}>{props.listing.cooling}</h3>
                    <h5 style={labelStyle}>cooling</h5>
                </div>
            </div>

            <div style={innerSectionStyle}>
                <div style={iconStyle}>
                    <h3><i class="fas fa-utensils fa-lg"></i></h3>
                </div>
                <div>
                    <h3 style={dataStyle}>{props.listing.kitchenType}</h3>
                    <h5 style={labelStyle}>kitchen</h5>
                </div>
            </div>
            <div style={innerSectionStyle}>
                <div style={iconStyle}>
                    <h3><i class="fas fa-tshirt fa-lg"></i></h3>
                </div>
                <div>
                    <h3 style={dataStyle}>{props.listing.laundry}</h3>
                    <h5 style={labelStyle}>laundry</h5>
                </div>
            </div>
        </section>
    )

}
