import { memo } from 'react'
import PropTypes from 'prop-types'
import './style.css'

function FormError({text}) {
  return (
    <form className="FormError">
      {text}
    </form>
  )
}

FormError.propTypes = {
  children: PropTypes.string
}

export default memo(FormError)