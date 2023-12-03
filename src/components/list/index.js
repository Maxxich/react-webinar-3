import React from "react";
import PropTypes from 'prop-types';
import Good from "../good";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function List({
  list, 
  renderItem
}) {

  const cn = bem('List');

  return (
    <div className={cn()}>{
      list.map(item =>
        <div key={item.code} className={cn('item')}>
          {renderItem(item)}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  renderItem: PropTypes.func,
};

List.defaultProps = {
  renderItem: () => null,
}

export default React.memo(List);
