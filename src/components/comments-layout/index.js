import { memo } from "react";
import {cn as bem} from '@bem-react/classname'
import PropTypes from 'prop-types';
import './style.css'

function CommentsLayout({children, title}) {
  const cn = bem('CommentsLayout')
  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{title}</h2>
      {children}
    </div>
  )
}

CommentsLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired
}

export default memo(CommentsLayout)