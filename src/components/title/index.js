import { memo } from "react"
import PropTypes from 'prop-types'
import './style.css'

function Title({text}) {
  return (
    <h2 className="Title">{text}</h2>
  )
}

Title.propTypes = {
  text: PropTypes.string
}

export default memo(Title)