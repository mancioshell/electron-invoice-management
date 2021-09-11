import { Button } from 'react-bootstrap'
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination
} from 'react-table'
import React from 'react'

import { useTranslation } from 'react-i18next'

import FilterTable from 'components/Utils/FilterTable'
import TablePagination from 'components/Utils/TablePagination'

function CustomerListTable({ customerList, updateCustomer, createInvoice }) {
  const { t } = useTranslation(['customer-table-list'])

  const actions = React.useCallback((customer) => (
    <>
      <Button
        className="mr-2 mb-2"
        variant="primary"
        type="button"
        size="sm"
        onClick={() => createInvoice(customer)}>
        <i className="fas fa-pencil-alt"></i> {t('button.create')}
      </Button>
      <Button
        className="mr-2 mb-2"
        variant="success"
        type="button"
        size="sm"
        onClick={() => updateCustomer(customer)}>
        <i className="fas fa-copy"></i> {t('button.modify')}
      </Button>
    </>
  ), [createInvoice, t, updateCustomer])

  const data = React.useMemo(
    () =>
      customerList.map((customer) => ({
        ...customer,
        actions: actions(customer)
      })),
    [actions, customerList]
  )

  const columns = React.useMemo(
    () => [
      { Header: t('columns.name'), accessor: 'name' },
      { Header: t('columns.surname'), accessor: 'surname' },
      { Header: t('columns.address'), accessor: 'address' },
      { Header: t('columns.phone'), accessor: 'phone' },
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
        searchLabel={t('label.search-customer')}
        selectLabel={t('label.customer-per-page')}
        {...filterProps}></FilterTable>
      <TablePagination
        {...tableProps}
        paginationProps={paginationProps}></TablePagination>
    </>
  )
}

export { CustomerListTable }

export default CustomerListTable
