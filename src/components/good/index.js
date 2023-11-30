import React from "react";
import PropTypes from "prop-types";
import './style.css';
import { getNumberForm } from "../../utils";
import {cn as bem} from '@bem-react/classname';

function Good(props) {

  const cn = bem('Good');

  const callbacks = {
    onAddToCart: (e) => {
      e.stopPropagation();
      props.onAddToCart(props.good.code);

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
      <div className={cn('actions')}>
        <button onClick={callbacks.onAddToCart}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Good.propTypes = {
  good: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAddToCart: PropTypes.func
};

Good.defaultProps = {
  onAddToCart: () => {
  },
}

export default React.memo(Good);
