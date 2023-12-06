import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, addon}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      { addon && (
        <div className="Head-addon">
          {addon}
        </div>
      )}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  addon: PropTypes.node
};

export default memo(Head);
