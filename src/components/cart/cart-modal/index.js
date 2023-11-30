import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import CartList from "../cart-list";
import CartTotal from "../cart-total";
import CartLayout from "../cart-layout";
import CartHead from "../cart-head";

function CartModal({
  goodsInCart,
  onCloseModal,
  onDeleteFromCart,
  totalCost
}) {

  return (
    <CartLayout onCloseModal={onCloseModal}>
      <CartHead onCloseModal={onCloseModal}/>
      {
        goodsInCart.length
          ? (<>
              <CartList goodsInCart={goodsInCart}
                        onDeleteFromCart={onDeleteFromCart}/>
              <CartTotal totalCost={totalCost}/>
          </>)
          : <strong className='CartModal-emptyMessage'>
            Корзина пуста
          </strong>
      }
    </CartLayout>
  )
}

CartModal.propTypes = {
  goodsInCart: PropTypes.array,
  onCloseModal: PropTypes.func,
  onDeleteFromCart: PropTypes.func,
  totalCost: PropTypes.number
};

CartModal.defaultProps = {
  goodsInCart: [],
  onCloseModal: () => {},
  onDeleteFromCart: () => {},
  totalCost: 0
}

export default React.memo(CartModal);
