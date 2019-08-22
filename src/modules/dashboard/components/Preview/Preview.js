import { PreviewExpansion } from './../../../shared/Preview_Expansion';
import { PreviewDetails } from './../../../shared/Preview_Details';
import { PreviewHeader } from './../../../shared/Preview_Header';
import React from 'react';
import './Preview.scss';
import { ImageCarousel } from '../../../shared/utilities/Image_Carousel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';


class Preview extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }
    render() {
        console.log(this.props);
        return (
            <article className="listing-preview">
                <ImageCarousel listing={this.props.listing} />
                <PreviewHeader listing={this.props.listing} />
                <ExpansionPanel>
                    <ExpansionPanelSummary className="listing-preview-panel">
                        <PreviewDetails listing={this.props.listing} />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <PreviewExpansion listing={this.props.listing}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </article>
        );
    }

}

export default Preview;