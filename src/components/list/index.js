import React from "react";
import PropTypes from 'prop-types';
import Good from "../good";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function List({list, onAddGoodToCart}) {

  const cn = bem('List');

  return (
    <div className={cn()}>{
      list.map(good =>
        <div key={good.code} className={cn('item')}>
          <Good good={good} 
                onAddToCart={onAddGoodToCart}
                key={good.code}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddGoodToCart: PropTypes.func,
};

List.defaultProps = {
  onAddGoodToCart: () => {
  },
}

export default React.memo(List);
