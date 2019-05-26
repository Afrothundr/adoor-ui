import { withFormsy } from 'formsy-react';
import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this);
    }

    changeValue(event) {
        // setValue() will set the value of the component, which in
        // turn will validate it and the rest of the form
        // Important: Don't skip this step. This pattern is required
        // for Formsy to work.
        this.props.setValue(event.target.value);
    }

    render() {
        // An error message is returned only if the component is invalid
        const className = this.props.showRequired() ? 'required-input' : '';
        return (
            <div className={className}>
                <FormControl>
                    <InputLabel htmlFor={this.props.label}>{this.props.label}</InputLabel>
                    <Select
                        onChange={this.changeValue}
                        type={this.props.type}
                        value={this.props.getValue() || ''}
                        inputProps={{
                            name: this.props.label,
                            id: this.props.label,
                          }}
                    >
                        {
                            this.props.options.map(option => <MenuItem value={option} key={option}>{option}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <span>{this.props.getErrorMessage()}</span>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(withFormsy(Input));
