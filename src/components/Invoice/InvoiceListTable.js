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
  const { t } = useTranslation(['invoice-list-table'])

  const actions = React.useCallback(
    (invoice) => (
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
    ),
    [printInvoice, readInvoice, removeInvoice, updateInvoice, t]
  )

  const data = React.useMemo(
    () =>
      invoiceList.map(({ number, customer, date, _id }) => {
        const { name, surname, address } = customer
        return {
          number: `${number}/${date.getFullYear()}`,
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
      { Header: t('columns.number'), accessor: 'number' },
      { Header: t('columns.name'), accessor: 'name' },
      { Header: t('columns.surname'), accessor: 'surname' },
      { Header: t('columns.address'), accessor: 'address' },
      {
        Header: t('columns.date'),
        accessor: 'date',
        sortType: (a, b) => {
          let dateA = a.values.date.split('/')
          let dateB = b.values.date.split('/')
          return new Date(`${dateA[1]} ${dateA[0]} ${dateA[2]}`) >
            new Date(`${dateB[1]} ${dateB[0]} ${dateB[2]}`)
            ? 1
            : -1
        }
      },
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
