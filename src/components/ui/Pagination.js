import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

/**
 *
 * @param page
 * @param totalPages
 * @param onPageSelect
 * @param dockLength (number of pages to show from either side of active page)
 * @returns {*}
 * @constructor
 */
const Pagination = ({ page, totalPages, onPageSelect, dockLength }) => {
  const showPrev = page > 1;
  const showNext = page < totalPages;

  let pages = [];
  let i = page > dockLength ? page - dockLength : 1;

  while (i <= totalPages && pages.length < dockLength * 2 + 1) {
    let k = i;
    pages.push(
      <Button key={i}        
        variant="contained"
        onClick={() => onPageSelect(k) }
        className={`btn  btn-info rounded-0 ${(page === k ? ' active' : ' ')}`}>{i}
      </Button>
    );
    i++;
  }

  return (
    <div className="btn-group btn-group-sm paggination-group">
      { showPrev &&
        <Button variant="contained"
          color='default'
          onClick={() => onPageSelect(1) }
          className='btn btn-light'><i className="la la-angle-double-left"></i>
        </Button>
      }
      { showPrev &&
        <Button variant="contained"
          color='default'
          onClick={() => onPageSelect(page - 1) }
          className='btn btn-light'><i className="la la-angle-left"></i>
        </Button>
      }
      { pages }
      { showNext &&
        <Button variant="contained"
          color='default'
          onClick={() => onPageSelect(page + 1) }
          className='btn  btn-light'><i className="la la-angle-right"></i>
        </Button>
      }
      { showNext &&
        <Button variant="contained"
          color='default'
          onClick={() => onPageSelect(totalPages) }
          className='btn btn-light'><i className="la la-angle-double-right"></i>
        </Button>
      }
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageSelect: PropTypes.func.isRequired,
  dockLength: PropTypes.number
};

Pagination.defaultProps = {
  dockLength: 3
};

export default Pagination;