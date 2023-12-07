import { memo } from "react";
import PropTypes from 'prop-types'
import './style.css'

function CenterMessage({
  children
}) {
  return (
    <span className='CenterMessage'>{children}</span>
  )
}


CenterMessage.propTypes = {
  children: PropTypes.node
}

export default memo(CenterMessage)