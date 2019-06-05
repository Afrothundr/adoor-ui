import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withFormsy } from 'formsy-react';
import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

class SquareFootage extends React.Component {
    constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this);
        this.textInput = React.createRef();
    }

    changeValue(event) {
        let value = event.currentTarget.value;
        this.props.setValue(value);
    }

    render() {
        // An error message is returned only if the component is invalid
        const className = this.props.showRequired() ? 'required-input' : '';
        return (
            <div className={className}>
                <TextField
                    value={this.props.getValue() || ''}
                    onChange={this.changeValue}
                    type={'number'}
                    label={this.props.label}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">ft²</InputAdornment>,
                      }}>
                </TextField>
                <span>{this.props.getErrorMessage()}</span>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(withFormsy(SquareFootage));


