import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import {cn as bem} from '@bem-react/classname'
import './style.css'

function CommentSignInOffer(props) {
  const cn = bem('CommentSignInOffer')
  return (
    <div className={cn()} style={{marginLeft: props.level * 30}}>
      <Link to={props.to} 
            state={{back: props.backPathname}}
            className={cn('link')}>{props.linkLabel}</Link>
      <span className={cn('message')}>{props.messageLabel}</span>
      {props.onCancel && (
        <>&nbsp;<button className={cn('button')}
                        onClick={props.onCancel}>{props.cancelLabel}</button></>
      )}
    </div>
  )
}

CommentSignInOffer.propTypes = {
  backPathname: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  level: PropTypes.number,
  onCancel: PropTypes.func,
  linkLabel: PropTypes.string.isRequired,
  messageLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string,
}

CommentSignInOffer.defaultProps = {
  level: 0
}

export default memo(CommentSignInOffer)