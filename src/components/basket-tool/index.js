import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import { i, iPlural } from "../../internationalization/i";

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{i('В корзине')}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${iPlural(amount, 'товар')} / ${numberFormat(sum)} ₽`
          : i(`пусто`)
        }
      </span>
      <button onClick={onOpen}>{i('Перейти')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
