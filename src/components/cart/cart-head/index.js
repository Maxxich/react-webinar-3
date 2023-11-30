import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';

function CartHead({
  onCloseModal,
}) {

  const cn = bem('CartHead');

  return (
    <div className={cn()}>
      <h2>Корзина</h2>
      <div className={cn('button')}>
        <button onClick={() => onCloseModal()}>Закрыть</button>
      </div>
    </div>
  )
}

CartHead.propTypes = {

  onCloseModal: PropTypes.func
};

CartHead.defaultProps = {
  onCloseModal: () => {}
}

export default React.memo(CartHead);
