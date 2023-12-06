import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import { i } from "../../internationalization/i";

function Controls({onAdd}) {
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{i("Добавить")}</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default memo(Controls);
