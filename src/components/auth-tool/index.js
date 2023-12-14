import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { Link } from "react-router-dom";
import './style.css'


function AuthTool({ onLogout, loginLink, replaceOnLoginLink, isAuthenticated,  t}) {
  const cn = bem('AuthTool');

  if (isAuthenticated) {
    return (
      <div className={cn()}>
        <button className={cn('logout')} onClick={onLogout}>{t('authTool.logout')}</button>
      </div>
    )
  }

  return (
    <div className={cn()}>
      <Link className={cn('login')} to={loginLink} replace={replaceOnLoginLink}>
        <button>{t('authTool.login')}</button>
      </Link>
    </div>
  );
}

AuthTool.propTypes = {
  onLogout: PropTypes.func.isRequired,
  loginLink: PropTypes.string.isRequired,
  replaceOnLoginLink: PropTypes.bool,
  t: PropTypes.func,
  isAuthenticated: PropTypes.bool
};

AuthTool.defaultProps = {
  onLogout: () => {
  },
  t: (text) => text
}

export default memo(AuthTool);
