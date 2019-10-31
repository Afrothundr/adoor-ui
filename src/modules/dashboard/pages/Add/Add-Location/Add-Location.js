
import React from 'react';
import './Add-Location.scss';
import Forms from '../../../../shared/utilities/forms';
import Formsy from 'formsy-react';
import Button from '@material-ui/core/Button';

class AddLocation extends React.Component {
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
            <div className="add-location">
                <header>
                    <i className="fas fa-map-marker-alt"></i><h3>Add Location</h3>
                </header>
                <Formsy className="form" onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} ref="form">
                    <Forms.Input
                        name="address"
                        type="text"
                        validationError="address is required"
                        label="address"
                        value={this.props.location.address}
                        required />
                    <Forms.Input
                        name="city"
                        label="city"
                        type="text"
                        validationError="city is required"
                        value={this.props.location.city}
                        required />
                    <Forms.MaskedInput
                        mask="99999"
                        name="zipcode"
                        label="zipcode"
                        type="text"
                        validations="minLength:5"
                        validationError="valid zipcode is required"
                        value={this.props.location.zipcode}
                        required
                    />
                    <div className="add-location-actions">
                        <Button onClick={this.handleClearClick} type="button">clear</Button>
                        <Button variant="contained" color="primary" disabled={!this.state.canSubmit} type="submit">next</Button>
                    </div>
                </Formsy>
            </div>
        )
    }
}

export default AddLocation;