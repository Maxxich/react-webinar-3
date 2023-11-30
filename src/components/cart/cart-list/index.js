import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import CartGood from "../cart-good";
import {cn as bem} from '@bem-react/classname';

function CartList({goodsInCart, onDeleteFromCart}) {

  const cn = bem('CartList');

  return (
    <div className={cn()}>{
      goodsInCart.map(good =>
        <div key={good.code} className={cn('good')}>
          <CartGood good={good} 
                    onDeleteFromCart={onDeleteFromCart} 
                    key={good.code}/>
        </div>
      )}
    </div>
  )
}

CartList.propTypes = {
  goodsInCart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteFromCart: PropTypes.func
};

CartList.defaultProps = {
  onDeleteFromCart: () => {}
}

export default React.memo(CartList);