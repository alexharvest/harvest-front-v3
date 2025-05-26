import React from 'react'
import ReactPaginate from 'react-paginate'
import { IoArrowBackSharp, IoArrowForwardSharp } from 'react-icons/io5'
import PropTypes from 'prop-types'
import { LeaderboardPagination } from '../../EarningsHistory/HistoryData/style'

const Pagination = ({
  pageCount,
  onPageChange,
  isMobile,
  bgColor,
  fontColor,
  fontColor1,
  fontColor2,
  inputBorderColor,
}) => {
  const CustomPreviousComponent = () => (
    <span>
      <IoArrowBackSharp /> {isMobile ? '' : 'Previous'}
    </span>
  )

  const CustomNextComponent = () => (
    <span>
      {isMobile ? '' : 'Next'} <IoArrowForwardSharp />
    </span>
  )

  return (
    <LeaderboardPagination
      $bgcolor={bgColor}
      $fontcolor={fontColor}
      $fontcolor1={fontColor1}
      $fontcolor2={fontColor2}
      $bordercolor={inputBorderColor}
    >
      <ReactPaginate
        breakLabel="..."
        nextLabel={<CustomNextComponent />}
        onPageChange={onPageChange}
        pageRangeDisplayed={5}
        marginPagesDisplayed={3}
        pageCount={pageCount}
        previousLabel={<CustomPreviousComponent />}
        containerClassName="paginate-wrapper"
        pageClassName="paginate-item"
        pageLinkClassName="paginate-item-link"
        activeClassName="selected"
        previousClassName="previous"
        nextClassName="next"
        disabledClassName="disabled"
        breakClassName="break"
      />
    </LeaderboardPagination>
  )
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  bgColor: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
  inputBorderColor: PropTypes.string.isRequired,
}

export default Pagination
