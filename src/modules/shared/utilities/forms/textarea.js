import { withFormsy } from 'formsy-react';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
      margin: theme.spacing.unit,
  }
});

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    this.props.setValue(event.currentTarget.value);
  }

  render() {
    // An error message is returned only if the component is invalid
    const className = this.props.showRequired() ? 'required-input' : '';
    return (
      <div className={className}>
        <TextField
          onChange={this.changeValue}
          value={this.props.getValue() || ''}
          label={this.props.label}
          multiline={true}
        />
        <span>{this.props.getErrorMessage()}</span>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(withFormsy(TextArea));
