import { memo } from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css'

function PagintaionButton({
  page,
  active,
  changePage,
}) {

  const cn = bem('PaginationButton')

  return (
    <button className={cn({ active: active })}
            onClick={() => changePage(page)}>
      { page }
    </button>
  )
}

PagintaionButton.propTypes = {
  page: PropTypes.number.isRequired,
  active: PropTypes.bool,
  changePage: PropTypes.func
}

PagintaionButton.defaultProps = {
  active: false,
  changePage: () => {}
}

export default memo(PagintaionButton);