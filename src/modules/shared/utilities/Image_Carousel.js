import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export const ImageCarousel = (props) => {
    return (
        <Carousel axis="horizontal" infiniteLoop={true} showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
            {
                props.listing.pictures.map((pictureSrc, i) => {
                    return <div key={i}>
                        <img alt={props.listing.address} src={pictureSrc} />
                    </div>
                })
            }
        </Carousel>
    )
}