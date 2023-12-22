import { memo } from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentCard({comment, onReply, labelReply, belongsToAuth}) {
  const cn = bem('CommentCard')
  return (
    <div className={cn()} style={{paddingLeft: comment.level * 30}}>
      <div className={cn('head')}>
        <span className={cn('name', {gray: belongsToAuth})}>{comment.author.name}</span>
        <span className={cn('date')}>{comment.dateCreate}</span>
      </div>
      <p>{comment.text}</p>
      <button onClick={() => onReply(comment._id)}>{labelReply}</button>
    </div>
  )
}


CommentCard.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    dateCreate: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    _id: PropTypes.string
  }).isRequired,
  onReply: PropTypes.func,
  labelReply: PropTypes.string.isRequired,
  belongsToAuth: PropTypes.bool
}

CommentCard.defaultProps = {
  onReply: () => {}
}

export default memo(CommentCard)