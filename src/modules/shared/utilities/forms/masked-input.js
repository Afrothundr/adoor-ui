import { withFormsy } from 'formsy-react';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputMask from 'react-input-mask';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

class MaskedInput extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      val: ''
    }
  }

  changeValue(event) {
    const value = event.currentTarget.value.split('').filter(val => val !== '_').join('');
    this.props.setValue(value);
  }

  render() {
    // An error message is returned only if the component is invalid
    const className = this.props.showRequired() ? 'required-input' : '';
    return (
      <div className={className}>
        <InputMask
          mask={this.props.mask}
          value={this.props.getValue() || ''}
          onChange={this.changeValue}
          className={this.props.classes.textField}
          maskChar={null}
        >
          {() => <TextField
            type={this.props.type}
            label={this.props.label}
          />}
        </InputMask>
        <span>{this.props.getErrorMessage()}</span>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(withFormsy(MaskedInput));
