import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import HelpBlock from './HelpBlock';

export default class TextInput extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    onInputChange: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool,
    additionalInputClasses: PropTypes.string,
    validation: PropTypes.object,
    handleValidityChange: PropTypes.func,
    showHelpBlock: PropTypes.bool,
  };
  render() {
    const {
      title,
      placeholder,
      type,
      name,
      value,
      onInputChange,
      isDisabled,
      validation,
      additionalInputClasses,
      handleValidityChange,
      showHelpBlock,
    } = this.props;
    let showRequiredIndicator = false;
    if (validation && validation.get('isRequired')) {
      showRequiredIndicator = true;
    }
    let showHB = true;
    if (showHelpBlock === undefined) {
      showHB = true;
    } else {
      showHB = showHelpBlock;
    }
    let isValid = true;
    if (validation) {
      isValid = validation.get('isValid');
    }
    if (!showHB) {
      isValid = true;
    }
    function isValidCSS() {
      return classNames({
        'form-group': true,
        'has-error': isValid === false,
      });
    }
    return (
      <div className={ isValidCSS() }>
        {title ?
          <div className='text-bold'>{title} { showRequiredIndicator && showRequiredIndicator === true && <span className='symbol required' /> }</div>
          : ''
        }
        <div className='input-group width-100-percent'>
          <input
            type={ type || 'text' }
            placeholder={ placeholder }
            className={ `form-control ${ additionalInputClasses }` }
            name={ name }
            disabled={ isDisabled || false }
            onChange={ onInputChange }
            value={ value }
            autoComplete={ type === 'password' ? type : '' }
          />
          {
            type === 'password' ? <span className='input-group-addon show-password' id={ name }><span className='iconic iconic-eye-closed' /></span> : ''
          }
        </div>
        {
          showHB ? <HelpBlock value={ value } validation={ validation } validityChange={ handleValidityChange } showHB={ showHB } /> : ''
        }

      </div>
    );
  }
}
