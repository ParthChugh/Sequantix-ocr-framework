import React from 'react';
import PropTypes from 'prop-types';

export default class HelpBlock extends React.Component {
  static propTypes = {
    validation: PropTypes.object,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    validityChange: PropTypes.func,
  };

  componentWillMount() {
    const { validation, validityChange, value } = this.props;
    const validity = this.isValidNumber(value) &&
      this.isValidLength(value) && this.isValidMaxLength(value) &&
      this.isValidMinLength(value) && this.isValidRequired(value) &&
      this.isEmailMobile(value) && this.isEmail(value) && this.isWebsite(value);
    validityChange(validation.get('fieldName'), validity);
  }

  componentWillReceiveProps(nextProps) {
    const { validation, validityChange, value } = nextProps;
    const validity = this.isValidNumber(value) &&
      this.isValidLength(value) && this.isValidMaxLength(value) &&
      this.isValidMinLength(value) && this.isValidRequired(value) &&
      this.isEmailMobile(value) && this.isEmail(value) && this.isWebsite(value);
    validityChange(validation.get('fieldName'), validity);
  }


  isValidNumber(nextValue) {
    const { validation } = this.props;
    let { value } = this.props;
    if (nextValue !== undefined) {
      value = nextValue;
    }
    if (validation.get('isNumber')) {
      const valueAsNumber = parseFloat(value);
      return !Number.isNaN(valueAsNumber) && Number.isFinite(valueAsNumber);
    }
    return true;
  }

  isEmail(nextValue) {
    const { validation } = this.props;
    let { value } = this.props;
    if (nextValue !== undefined) {
      value = nextValue;
    }
    if (validation.get('isEmail') && nextValue !== '') {
      return this.testEmail(value);
    }
    return true;
  }

  testEmail(value) {
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
    return emailRegExp.test(value);
  }

  isWebsite(nextValue) {
    const { validation } = this.props;
    let { value } = this.props;
    if (nextValue !== undefined) {
      value = nextValue;
    }
    if (validation.get('isWebsite') && value.length > 0) {
      return this.testWebsite(value);
    }
    return true;
  }

  testWebsite(value) {
    const websiteRegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/; // eslint-disable-line no-useless-escape
    return websiteRegExp.test(value);
  }

  isEmailMobile(nextValue) {
    const { validation } = this.props;
    let { value } = this.props;
    if (nextValue !== undefined) {
      value = nextValue;
    }
    if (validation.get('isEmailMobile')) {
      const valueAsNumber = parseFloat(value);
      return (!Number.isNaN(valueAsNumber) && Number.isFinite(valueAsNumber) &&
        (value.length === 10)) || this.testEmail(value);
    }
    return true;
  }

  isValidLength(nextValue) {
    const { validation } = this.props;
    let { value } = this.props;
    if (nextValue !== undefined) {
      value = nextValue;
    }
    if (validation.get('length')) {
      return value.toString().length === validation.get('length');
    }
    return true;
  }

  isValidRequired(nextValue) {
    const { validation } = this.props;
    let { value } = this.props;
    if (nextValue !== undefined) {
      value = nextValue;
    }
    if (validation.get('isRequired')) {
      return value.toString().length > 0;
    }
    return true;
  }

  isValidMinLength(nextValue) {
    const { validation } = this.props;
    let { value } = this.props;
    if (nextValue !== undefined) {
      value = nextValue;
    }
    if (validation.get('minLength') && value.length > 0) {
      return value.length >= validation.get('minLength');
    }
    return true;
  }

  isValidMaxLength(nextValue) {
    const { validation } = this.props;
    let { value } = this.props;
    if (nextValue !== undefined) {
      value = nextValue;
    }
    if (validation.get('maxLength')) {
      return value.length <= validation.get('maxLength');
    }
    return true;
  }

  render() {
    const { validation } = this.props;
    return (
      <div className={ `help-block ${ (validation.get('isValid') !== false) ? 'hidden' : '' }` } >
        <ul className='list-unstyled'>
          <li className={ (this.isValidNumber() !== false) ? 'hidden' : '' }>Please enter a valid number</li>
          <li className={ (this.isValidLength() !== false) ? 'hidden' : '' }>Please enter {validation.get('length')} digits</li>
          <li className={ (this.isValidRequired() !== false) ? 'hidden' : '' }>This field is required</li>
          <li className={ (this.isValidMaxLength() !== false) ? 'hidden' : '' }>This field must contain less than {validation.get('maxLength')} characters</li>
          <li className={ (this.isValidMinLength() !== false) ? 'hidden' : '' }>This field must contain minimum {validation.get('minLength')} characters</li>
          <li className={ (this.isEmailMobile() !== false) ? 'hidden' : '' }>Please enter a valid mobile number or email</li>
          <li className={ (this.isEmail() !== false) ? 'hidden' : '' }>Please enter a valid email</li>
          <li className={ (this.isWebsite() !== false) ? 'hidden' : '' }>Please enter a valid website</li>
        </ul>
      </div>
    );
  }
}
