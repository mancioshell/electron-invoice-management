import { Pagination as BootstrapPagination } from 'react-bootstrap'

function Pagination({
  previousPage,
  canPreviousPage,
  nextPage,
  canNextPage,
  gotoPage,
  pageCount,
  pageOptions,
  pageIndex
}) {
  return (
    <BootstrapPagination>
      <BootstrapPagination.First onClick={() => gotoPage(0)} />
      {canPreviousPage && <BootstrapPagination.Prev onClick={() => previousPage()} />}

      {pageOptions.map((page, i) => {
        return (
          <BootstrapPagination.Item
            key={i}
            active={pageIndex === page}
            onClick={() => gotoPage(page)}>
            {page + 1}
          </BootstrapPagination.Item>
        )
      })}

      {canNextPage && <BootstrapPagination.Next onClick={() => nextPage()} />}

      <BootstrapPagination.Last onClick={() => gotoPage(pageCount - 1)} />
    </BootstrapPagination>
  )
}

export { Pagination }

export default Pagination
