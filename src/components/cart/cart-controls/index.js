import React, { useMemo, useState } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { getNumberForm } from "../../../utils";
import CartModal from "../cart-modal";
import {cn as bem} from '@bem-react/classname';
import { getGoodWordForm } from "./utils";

function CartControls({
  goodsInCart,
  onDeleteFromCart
}) {

  const cn = bem('CartControls');

  const [isModalOpen, setIsModalOpen] = useState(false)

  const callbacks = useMemo(() => ({
    onOpenModal: () => setIsModalOpen(true),
    onCloseModal: () => setIsModalOpen(false),
  }), [])

  const totalCost = goodsInCart.reduce(
    (acc, good) => acc + good.price*(good.quantityInCart || 0), 0
  )

  const cartInfo = (goodsInCart.length > 0)
    ? goodsInCart.length + ' ' + getGoodWordForm(goodsInCart.length) + ' / '+ getNumberForm(totalCost) + ' ₽'
    : 'пусто'

  return (
    <div className={cn()}>
      <div className={cn('info')}>
        В корзине:
        <strong>{cartInfo}</strong>
      </div>
      <div className={cn('button')}>
        <button onClick={() => callbacks.onOpenModal()}>Перейти</button>
      </div>
      {
        isModalOpen && <CartModal goodsInCart={goodsInCart}
                                  onCloseModal={callbacks.onCloseModal}
                                  onDeleteFromCart={onDeleteFromCart}
                                  totalCost={totalCost}/>
      }
    </div>
  )
}

CartControls.propTypes = {
  goodsInCart: PropTypes.array,
  onDeleteFromCart: PropTypes.func
};

CartControls.defaultProps = {
  goodsInCart: [],
  onDeleteFromCart: () => {}
}

export default React.memo(CartControls);
