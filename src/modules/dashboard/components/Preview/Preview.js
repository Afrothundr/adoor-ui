import { PreviewExpansion } from './../../../shared/Preview_Expansion';
import { PreviewDetails } from './../../../shared/Preview_Details';
import { PreviewHeader } from './../../../shared/Preview_Header';
import React from 'react';
import './Preview.scss';
import { ImageCarousel } from '../../../shared/utilities/Image_Carousel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';



class Preview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentListing: this.getListing(this.props.match.params.listingId)
        }
    }


    getListing = id => {
        return this.props.listings.find(listing => listing.id === id) || null;
    }

    render() {
        console.log(this.state.currentListing);
        return (
            <article className="listing-preview">
                <ImageCarousel listing={this.state.currentListing} />
                <PreviewHeader listing={this.state.currentListing} />
                <ExpansionPanel>
                    <ExpansionPanelSummary className="listing-preview-panel">
                        <PreviewDetails listing={this.state.currentListing} />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <PreviewExpansion listing={this.state.currentListing}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </article>
        );
    }

}

export default Preview;