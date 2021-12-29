import { Button } from 'react-bootstrap'
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination
} from 'react-table'
import React from 'react'
import { useTranslation } from 'react-i18next'

import FilterTable from 'Components/Utils/FilterTable'
import TablePagination from 'Components/Utils/TablePagination'

function InvoiceListTable({
  invoiceList,
  updateInvoice,
  removeInvoice,
  readInvoice,
  printInvoice
}) {
  const { t } = useTranslation(['invoice-table-list'])

  const actions = React.useCallback((invoice) => (
    <>
      <Button
        className="mr-2 mb-2"
        variant="dark"
        type="button"
        size="sm"
        onClick={(e) => readInvoice(e, invoice)}>
        <i className="fas fa-clipboard-list"></i> {t('actions.view')}
      </Button>
      <Button
        className="mr-2 mb-2"
        variant="primary"
        type="button"
        size="sm"
        onClick={(e) => updateInvoice(e, invoice)}>
        <i className="fas fa-pencil-alt"></i> {t('actions.modify')}
      </Button>
      <Button
        className="mr-2 mb-2"
        variant="info"
        type="button"
        size="sm"
        onClick={(e) => printInvoice(invoice)}>
        <i className="fas fa-print"></i> {t('actions.print')}
      </Button>
      <Button
        className="mr-2 mb-2"
        variant="danger"
        type="button"
        size="sm"
        onClick={(e) => removeInvoice(e, invoice)}>
        <i className="fas fa-trash"></i> {t('actions.remove')}
      </Button>
    </>
  ), [printInvoice, readInvoice, removeInvoice, t, updateInvoice])

  const data = React.useMemo(
    () =>
      invoiceList.map(({ customer, date, _id }) => {
        const { name, surname, address } = customer
        return {
          name,
          surname,
          address,
          date: date.toLocaleDateString(),
          actions: actions({ customer, date, _id })
        }
      }),
    [actions, invoiceList]
  )

  const columns = React.useMemo(
    () => [
      { Header: t('columns.name'), accessor: 'name' },
      { Header: t('columns.surname'), accessor: 'surname' },
      { Header: t('columns.address'), accessor: 'address' },
      { Header: t('columns.date'), accessor: 'date' },
      { Header: t('columns.actions'), accessor: 'actions' }
    ],
    [t]
  )

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    previousPage,
    canPreviousPage,
    nextPage,
    canNextPage,
    page,
    gotoPage,
    pageCount,
    pageOptions,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter }
  } = tableInstance

  const paginationProps = {
    previousPage,
    canPreviousPage,
    nextPage,
    canNextPage,
    gotoPage,
    setPageSize,
    pageCount,
    pageOptions,
    pageIndex
  }
  const filterProps = {
    globalFilter,
    pageSize,
    setPageSize,
    setGlobalFilter
  }
  const tableProps = {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow
  }

  return (
    <>
      <FilterTable
        searchLabel={t('label.invoice-search')}
        selectLabel={t('label.invoice-per-page')}
        {...filterProps}></FilterTable>
      <TablePagination
        {...tableProps}
        paginationProps={paginationProps}></TablePagination>
    </>
  )
}

export { InvoiceListTable }

export default InvoiceListTable
