import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { getNumberForm } from "../../../utils";

function CartTotal({
  totalCost
}) {

  return (
    <div className='CartTotal'>
      <strong>Итого</strong>
      <strong>
        {getNumberForm(totalCost) + ' ₽'}
      </strong>
    </div>
  )
}

CartTotal.propTypes = {
  totalCost: PropTypes.number.isRequired,
};

export default React.memo(CartTotal);
