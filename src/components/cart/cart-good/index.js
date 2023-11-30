import React from "react";
import PropTypes from "prop-types";
import './style.css';
import { getNumberForm } from "../../../utils";
import {cn as bem} from '@bem-react/classname';

function CartGood(props) {

  const cn = bem('CartGood');

  const callbacks = {
    onDeleteFromCart: (e) => {
      e.stopPropagation();
      props.onDeleteFromCart(props.good.code);

    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.good.code}</div>
      <div className={cn('title')}>
        {props.good.title}
      </div>
      <div className={cn('price')}>
        {getNumberForm(props.good.price) + ' ₽'}
      </div>
      <div className={cn('quantity')}>
        {getNumberForm(props.good.quantityInCart) + ' шт'}
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onDeleteFromCart}>
          Удалить
        </button>
      </div>
    </div>
  );
}

CartGood.propTypes = {
  good: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantityInCart: PropTypes.number
  }).isRequired,
  onDeleteFromCart: PropTypes.func
};

CartGood.defaultProps = {
  onDeleteFromCart: () => {
  },
}

export default React.memo(CartGood);
