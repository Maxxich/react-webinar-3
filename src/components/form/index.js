import { memo } from 'react'
import PropTypes from 'prop-types'
import './style.css'

function Form({children}) {
  return (
    <form className="Form">
      {children}
    </form>
  )
}

Form.propTypes = {
  children: PropTypes.node
}

export default memo(Form)