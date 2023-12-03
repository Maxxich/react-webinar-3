import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import { createPortal } from "react-dom";

function Modal({
  onCloseModal,
  children
}) {

  const cn = bem('Modal');

  return createPortal(
    <div className={cn()}
         onClick={() => onCloseModal()}>
      <div className={cn('center')}
           onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('modal')
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  onCloseModal: PropTypes.func,
};

Modal.defaultProps = {
  onCloseModal: () => {},
}

export default React.memo(Modal);
