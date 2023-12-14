import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './style.css'

function AuthMenu({items}) {
  const cn = bem('AuthMenu');
  return (
    <ul className={cn()}>
      {items.map(item => (
        <li key={item.key} className={cn('item')}>
          <Link to={item.link}>{item.title}</Link>
        </li>
      ))}
    </ul>
  )
}

AuthMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    link: PropTypes.string,
    title: PropTypes.string,
  })),
}

AuthMenu.defaultProps = {
  items: [],
}

export default memo(AuthMenu);
