import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css'
import PaginationButton from './pagination-button';

function PagintaionTool({
  page,
  lastPage,
  changePage
}) {
  const rightDiff = lastPage - page
  const leftDiff = page - 1

  if (rightDiff < 0 || leftDiff < 0) return null

  if (lastPage <= 5) {
    return (
      <div className={'PaginationTool'}>
        {
          Array(lastPage).fill(1).map((e, i) => (
            <PaginationButton page={i + 1}
                              changePage={changePage}
                              active={(i + 1) === page}/>
          ))
        }
      </div>
    )
  }

  const flags = {
    start: leftDiff >= 2,
    leftDots: leftDiff >= 3,
    secondLeft: leftDiff >= 2 && page === lastPage,
    firstLeft: leftDiff >= 1,
    firstRight: rightDiff >= 1,
    secondRight: rightDiff >= 2 && page === 1,
    rightDots: rightDiff >= 3,
    finish: rightDiff >= 2,
  }

  return (
    <div className={'PaginationTool'}>
      { flags.start && <PaginationButton page={1}
                                         changePage={changePage}/> }
      { flags.leftDots && '...' }
      { flags.secondLeft && <PaginationButton page={page - 2}
                                              changePage={changePage}/> }
      { flags.firstLeft && <PaginationButton page={page - 1}
                                             changePage={changePage}/> }
      <PaginationButton page={page} 
                        active
                        changePage={changePage}/>
      { flags.firstRight && <PaginationButton page={page + 1}
                                              changePage={changePage}/> }
      { flags.secondRight && <PaginationButton page={page + 2}
                                               changePage={changePage}/>}
      { flags.rightDots && '...' }
      { flags.finish && <PaginationButton page={lastPage}
                                          changePage={changePage}/> }
    </div>
  )
}

PagintaionTool.propTypes = {
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  changePage: PropTypes.func
}

PagintaionTool.defaultValues = {
  changePage: () => {}
}

export default memo(PagintaionTool);