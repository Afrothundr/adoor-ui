import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { withFormsy } from 'formsy-react';
import React from 'react';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

class CheckboxInput extends React.Component {
    constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this);

        this.state = {
            isChecked: false
        }
    }

    componentDidMount() {
        this.setState({
            isChecked: this.props.value
        })
    }

    changeValue(event) {
        // setValue() will set the value of the component, which in
        // turn will validate it and the rest of the form
        // Important: Don't skip this step. This pattern is required
        // for Formsy to work.
        this.setState({
            isChecked: !this.state.isChecked
        })
        this.props.setValue(this.state.isChecked);
    }

    render() {
        // An error message is returned only if the component is invalid
        const className = this.props.showRequired() ? 'required-input' : '';
        return (
            <div className={className}>
                <FormControl component="fieldset">
                    <FormControlLabel
                        control={<Checkbox checked={this.state.isChecked} onChange={this.changeValue} />}
                        label={this.props.label}
                    />
                </FormControl>
                <span>{this.props.getErrorMessage()}</span>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(withFormsy(CheckboxInput));
