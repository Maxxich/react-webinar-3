import { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import './style.css'

function Navigation({links}) {

  const cn = bem('Navigation');

  return (
    <nav className={cn()}>
      {links.map((link) => (
        <Link key={link.to}
              to={link.to}
              className={cn('link')}>{link.title}</Link>
      ))}
    </nav>
  )
} 

Navigation.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    to: PropTypes.string
  }))
}

export default memo(Navigation)