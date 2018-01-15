import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';

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
        raised
        color='accent'
        onClick={() => onPageSelect(k) }
        className='mt-btn mt-btn-success'>{i}
      </Button>
    );
    i++;
  }

  return (
    <div>
      { showPrev &&
        <Button raised
          color='accent'
          onClick={() => onPageSelect(1) }
          className='mt-btn mt-btn-success'>first
        </Button>
      }
      { showPrev &&
        <Button raised
          color='accent'
          onClick={() => onPageSelect(page - 1) }
          className='mt-btn mt-btn-success'>prev
        </Button>
      }
      { pages }
      { showNext &&
        <Button raised
          color='accent'
          onClick={() => onPageSelect(page + 1) }
          className='mt-btn mt-btn-success'>next
        </Button>
      }
      { showNext &&
        <Button raised
          color='accent'
          onClick={() => onPageSelect(totalPages) }
          className='mt-btn mt-btn-success'>last
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