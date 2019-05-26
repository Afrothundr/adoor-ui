
import React from 'react';
import './Add-Details.scss';
import Forms from '../../../../shared/utilities/forms';
import Formsy from 'formsy-react';
import Button from '@material-ui/core/Button';

class AddDetails extends React.Component {
    constructor() {
        super();
        this.state = { canSubmit: false };
    }

    disableButton = () => {
        this.setState({ canSubmit: false });
        this.props.isFormValid(false);
    }

    enableButton = () => {
        this.setState({ canSubmit: true });
        this.props.isFormValid(true);
    }

    handleClearClick = () => {
        this.refs.form.reset()
    }

    submit = model => {
        this.props.handleSubmit(model);
    }

    parentSubmit = () => {
        this.props.handleSubmit(this.refs.form.getModel());
    }

    render() {
        return (
            <div className="add-details">
                <header>
                    <i className="fas fa-home"></i><h3>Add Details</h3>
                </header>
                <Formsy className="form" onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} ref="form">
                    <div className="wrapper">
                        <div className="section-1">
                            <Forms.Input
                                name="bedrooms"
                                type="text"
                                validationError="bedrooms are required"
                                label="bedrooms"
                                required />
                            <Forms.Input
                                name="bathrooms"
                                label="bathrooms"
                                type="text"
                                validationError="bathrooms are required"
                                required />
                            <Forms.Input
                                name="squareFootage"
                                type="text"
                                validationError="squareFootage is required"
                                label="squareFootage"
                                required />
                            <Forms.Input
                                name="price"
                                label="price"
                                type="text"
                                validationError="price is required"
                                required />
                        </div>
                        <div className="section-2">
                            <Forms.Select
                                name="heating"
                                options={[
                                    'Forced Air',
                                    'Baseboard',
                                    'Gravity',
                                    'Heat Pump',
                                    'Steam',
                                    'Wood Stove'
                                ]}
                                validationError="heating type is required"
                                label="heating type"
                                required />
                            <Forms.Input
                                name="cooling"
                                label="cooling type"
                                type="text"
                                validationError="cooling type is required"
                                required />
                            <Forms.Input
                                name="kitchen"
                                type="text"
                                validationError="kitchen type is required"
                                label="kitchen type"
                                required />
                            <Forms.Input
                                name="laundry"
                                label="laundry type"
                                type="text"
                                validationError="laundry type is required"
                                required />
                        </div>
                        <div className="section-3">
                            <Forms.Input
                                name="year built"
                                label="year built"
                                type="text"
                                validationError="year built is required"
                                required />
                            <Forms.Input
                                name="year renovated"
                                type="text"
                                label="year renovated"
                            />
                            <Forms.Input
                                name="fireplace"
                                label="does it have a fireplace?"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="add-details-actions">
                        <Button onClick={this.handleClearClick} type="button">clear</Button>
                        <Button variant="contained" color="primary" disabled={!this.state.canSubmit} type="submit">submit</Button>
                    </div>
                </Formsy>
            </div>
        )
    }
}

export default AddDetails;