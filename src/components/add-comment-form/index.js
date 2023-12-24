import { forwardRef, memo } from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css'

function AddCommentForm(props, ref) {
  const cn = bem('AddCommentForm')
  const onChange = (e) => props.onValueChange(e.target.value)

  return (
    <div className={cn()} style={{marginLeft: Math.min(props.level || 0, props.maxLevel || 0) * 30}}>
      <span className={cn('title')}>{props.title}</span>
      <textarea className={cn('textarea')} 
                inputMode="text" 
                disabled={props.disabled}
                placeholder={props.placeholder}
                value={props.value}
                onChange={onChange}
                ref={ref}/>
      <div>
        <button className={cn('button')} 
                onClick={props.onSend}>{props.sendLabel}</button>
        {
          props.onCancel && (
            <button className={cn('button')} 
                    onClick={props.onCancel}>{props.cancelLabel}</button>
          )
        }
      </div>
    </div>
  )
}

AddCommentForm.propTypes = {
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onSend: PropTypes.func.isRequired,
  sendLabel: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
  cancelLabel: PropTypes.string,
  placeholder: PropTypes.string,
  level: PropTypes.number,
  maxLevel: PropTypes.number,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
}

AddCommentForm.defaultProps = {
  level: 0,
  maxLevel: 0
}

export default memo(forwardRef(AddCommentForm))