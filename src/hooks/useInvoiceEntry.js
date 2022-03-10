import { useState, useEffect } from 'react'

function useInvoiceEntry(services, taxStampTreshold, taxStampAmount) {
  
  const [totalServices, setTotalServices] = useState(0)

  const [invoiceEntry, setInvoiceEntry] = useState({
    totalIncome: 0,
    totalIva: 0,
    taxStamp: 0,
    totalInvoice: 0
  })

  useEffect(() => {
    const totalServices = services.reduce((curr, next) => curr + next.price, 0)
    setTotalServices(totalServices)
  }, [services])

  useEffect(() => {
    const extractIva = (tot) => (tot * 100) / (100 + 4)

    const totalIncome = extractIva(totalServices)
    const totalIva = (totalIncome * 4) / 100
    const totalInvoice =
      totalIncome >= taxStampTreshold
        ? totalIncome + totalIva + taxStampAmount
        : totalIncome + totalIva
    const taxStamp = totalIncome >= taxStampTreshold ? taxStampAmount : 0

    setInvoiceEntry({ totalIncome, totalIva, totalInvoice, taxStamp })
  }, [taxStampAmount, taxStampTreshold, totalServices])

  return invoiceEntry
}

export default useInvoiceEntry
