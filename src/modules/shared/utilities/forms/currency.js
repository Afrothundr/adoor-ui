import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withFormsy } from 'formsy-react';
import React from 'react';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

class CurrencyInput extends React.Component {
    constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this);
        this.textInput = React.createRef();
        this.state = {
            val: ''
        }
    }

    changeValue(event) {
        let value = event.currentTarget.value;
        if(value.indexOf('$') === -1)
            value = '$ ' + value;    
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
                    type={'text'}
                    label={this.props.label}>
                </TextField>
                <span>{this.props.getErrorMessage()}</span>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(withFormsy(CurrencyInput));


