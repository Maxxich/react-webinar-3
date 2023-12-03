import React, { useMemo, useState } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { getNumberForm } from "../../../utils";
import Modal from "../../modal";
import {cn as bem} from '@bem-react/classname';
import { getGoodWordForm } from "./utils";
import CartHead from '../cart-head'
import List from '../../list'
import CartTotal from '../cart-total'
import CartGood from '../cart-good'

function Cart({
  list,
  onDelete,
  totalCost
}) {

  const cn = bem('Cart');

  const [isModalOpen, setIsModalOpen] = useState(false)

  const callbacks = useMemo(() => ({
    onOpenModal: () => setIsModalOpen(true),
    onCloseModal: () => setIsModalOpen(false),
  }), [])

  const showGoodsInCart = list.length

  const cartInfo = (list.length > 0)
    ? list.length + ' ' + getGoodWordForm(list.length) + ' / '+ getNumberForm(totalCost) + ' ₽'
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
        isModalOpen && <Modal onCloseModal={callbacks.onCloseModal}>
          <CartHead onCloseModal={callbacks.onCloseModal}/>
          {
            showGoodsInCart
              ? (<>
                  <List list={list}
                        renderItem={(good) => (
                          <CartGood good={good} 
                                    onDeleteFromCart={onDelete}/>
                        )}/>
                  <CartTotal totalCost={totalCost}/>
              </>)
              : <strong className={cn('emptyMessage')}>
                Корзина пуста
              </strong>
          }
        </Modal>
      }
    </div>
  )
}

Cart.propTypes = {
  list: PropTypes.array,
  onDeleteFromCart: PropTypes.func,
  totalCost: PropTypes.number.isRequired
};

Cart.defaultProps = {
  list: [],
  onDeleteFromCart: () => {}
}

export default React.memo(Cart);
