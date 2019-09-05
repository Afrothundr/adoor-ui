import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export const ImageCarousel = (props) => {
    const style = {
         height: '100%',
         backgroundPosition: 'center',
         backgroundSize: 'cover',
         backgroundRepeat: 'no-repeat'


    }
    return (
        <Carousel axis="horizontal" infiniteLoop={true} showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
            {
                props.listing.pictures.map((pictureSrc, i) => {
                    return <div key={i} style={{...style, backgroundImage: `url('${pictureSrc}')`}} />
                })
            }
        </Carousel>
    )
}