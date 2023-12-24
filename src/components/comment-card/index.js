import { memo } from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentCard(props) {
  const cn = bem('CommentCard')
  return (
    <div className={cn()} style={{paddingLeft: Math.min(props.level, props.maxLevel) * 30}}>
      <div className={cn('head')}>
        <span className={cn('name', {gray: props.belongsToAuth})}>{props.authorName}</span>
        <span className={cn('date')}>{props.dateCreate}</span>
      </div>
      <p>{props.text}</p>
      <button onClick={() => props.onReply(props._id)}>{props.labelReply}</button>
    </div>
  )
}


CommentCard.propTypes = {
  authorName: PropTypes.string.isRequired,
  dateCreate: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  maxLevel: PropTypes.number,
  _id: PropTypes.string,
  onReply: PropTypes.func,
  labelReply: PropTypes.string.isRequired,
  belongsToAuth: PropTypes.bool
}

CommentCard.defaultProps = {
  onReply: () => {},
  maxLevel: 0
}

export default memo(CommentCard)