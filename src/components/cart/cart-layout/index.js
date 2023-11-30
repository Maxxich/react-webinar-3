import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CartLayout({children, onCloseModal}) {

  const cn = bem('CartModal');

  return (
    <div className={cn()}
         onClick={() => onCloseModal()}>
      <div className={cn('center')}
           onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

CartLayout.propTypes = {
  children: PropTypes.node,
  onCloseModal: PropTypes.func,
}

CartLayout.defaultProps = {
  onCloseModal: () => {},
}

export default React.memo(CartLayout);
