import {memo} from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import './style.css'

function FormInput(props) {

  const onChange = (event) => {
    props.onChange(event.target.value);
  };

  const cn = bem('FormInput')

  return (
    <div className={cn()}>
      {props.label && <label className={cn('label')}>{props.label}</label>}
      <input
        className={cn('input')}
        value={props.value}
        type={props.type}
        placeholder={props.placeholder}
        onChange={onChange}
        disabled={props.disabled}
      />
    </div>

  )
}

FormInput.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool
}

FormInput.defaultProps = {
  onChange: () => {
  },
  type: 'text',
}

export default memo(FormInput);
