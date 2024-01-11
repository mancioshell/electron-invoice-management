const { create } = require('xmlbuilder2')

function generateXml(settings, invoice) {

    const taxStampTreshold = settings['tax-stamp-treshold']
    let paymentType = invoice.payment || "MP05"

    const extractIva = (tot) => (tot * 100) / (100 + 4)
    const total = invoice.services.reduce((curr, next) => curr + next.price, 0)

    let totalServices = 0

    const serviceList = create().ele("DatiBeniServizi")

    for (const [index, service] of invoice.services.entries()) {
        const serviceIncome = extractIva(service.price)   
        totalServices = totalServices + serviceIncome     
        serviceList
        .ele('DettaglioLinee')
            .ele('NumeroLinea').txt(index+1).up()
            .ele('Descrizione').txt(service.type).up()
            .ele('PrezzoUnitario').txt(serviceIncome.toFixed(2)).up()
            .ele('PrezzoTotale').txt(serviceIncome.toFixed(2)).up()
            .ele('AliquotaIVA').txt('4.00').up()
        .up()
    }   

    const totalIva = (totalServices * 4) / 100
    console.log(totalServices)
       
    serviceList
    .ele('DatiRiepilogo')
        .ele('AliquotaIVA').txt('4.00').up()
        .ele('ImponibileImporto').txt(totalServices.toFixed(2)).up() // Totale Imponibile
        .ele('Imposta').txt(totalIva.toFixed(2)).up() // IVA
        .ele('EsigibilitaIVA').txt('I').up()
        //.ele('Arrotondamento').txt('I').up()
    .up()
    .up()

    const taxStampElement = create()

    if(totalServices > taxStampTreshold){        
        taxStampElement
            .ele("DatiBollo")
                .ele('BolloVirtuale').txt('SI').up()
                .ele('ImportoBollo').txt('2.00').up()
            .up()
    }

    const formattedDate = `${invoice.date.getFullYear()}-${invoice.date.getMonth() + 1}-${invoice.date.getDate()}`;


    const ds = 'http://www.w3.org/2000/09/xmldsig#'
    const p = 'http://ivaservizi.agenziaentrate.gov.it/docs/xsd/fatture/v1.2'
    const xsi = 'http://www.w3.org/2001/XMLSchema-instance'
    const schemaLocation = `${p} http://www.fatturapa.gov.it/export/fatturazione/sdi/fatturapa/v1.2/Schema_del_file_xml_FatturaPA_versione_1.2.xsd`

    const doc = create({ version: '1.0', encoding: 'UTF-8' })
        .ele('p:FatturaElettronica', { versione: 'FPR12' })
        .att('xmlns:ds', ds)
        .att('xmlns:p', p)
        .att('xmlns:xsi', xsi)
        .att('xsi:schemaLocation', schemaLocation)

            .ele('FatturaElettronicaHeader')

                .ele('DatiTrasmissione')
                    .ele('IdTrasmittente')
                        .ele('IdPaese').txt('IT').up()
                        .ele('IdCodice').txt(settings.cf).up() // è il codice fiscale
                    .up()            
                    .ele('ProgressivoInvio').txt(`${invoice.number}/${invoice.date.getFullYear()}`).up() // Progressivo Fattura
                    .ele('FormatoTrasmissione').txt('FPR12').up() // FPR12 fattura verso privati
                    .ele('CodiceDestinatario').txt('0000000').up() // Required 0000000 oppure la tua PEC
                .up()

                .ele('CedentePrestatore')
                    .ele('DatiAnagrafici')
                        .ele('IdFiscaleIVA')
                            .ele('IdPaese').txt('IT').up()
                            .ele('IdCodice').txt(settings.cf).up()
                        .up()
                        .ele('Anagrafica')
                            .ele('Nome').txt(settings.name).up()
                            .ele('Cognome').txt(settings.surname).up()
                        .up()
                        .ele('RegimeFiscale').txt("RF19").up() // RF19 Regime Forattario
                    .up()
                    .ele('Sede')
                        .ele('Indirizzo').txt(settings.address).up()
                        .ele('CAP').txt(settings.cap).up()
                        .ele('Comune').txt(settings.city).up()
                        //.ele('Provincia').txt('RM').up()
                        .ele('Nazione').txt('IT').up()
                    .up()
                .up()

                .ele('CessionarioCommittente')
                    .ele('DatiAnagrafici')
                        .ele('CodiceFiscale').txt(invoice.customer.cf).up()
                        .ele('Anagrafica')
                            .ele('Nome').txt(invoice.customer.name).up()
                            .ele('Cognome').txt(invoice.customer.surname).up()
                        .up()
                    .up()
                    .ele('Sede')
                        .ele('Indirizzo').txt(invoice.customer.address).up()
                        .ele('CAP').txt(invoice.customer.cap).up()
                        .ele('Comune').txt(invoice.customer.city).up()
                        //.ele('Provincia').txt('RM').up()
                        .ele('Nazione').txt('IT').up()
                    .up()
                .up()
            .up()

            .ele('FatturaElettronicaBody')
            
                .ele('DatiGenerali')
                    .ele('DatiGeneraliDocumento')
                        .ele('TipoDocumento').txt('TD01').up() // TD01 sta per Fattura
                        .ele('Divisa').txt('EUR').up()
                        .ele('Data').txt(formattedDate).up()
                        .ele('Numero').txt(`${invoice.number}/${invoice.date.getFullYear()}`).up() // Progressivo Fattura
                        .ele(taxStampElement.toObject()).up()
                    .up()
                .up()
                .ele(serviceList.toObject()).up()

                .ele('DatiPagamento')
                    .ele('CondizioniPagamento').txt('TP02').up() // TP02 Pagamento Completo
                    .ele('DettaglioPagamento')
                        .ele('ModalitaPagamento').txt(paymentType).up() // Required MP01 : contanti, MP05: Bonifico, MP08: Bancomat. Default MP05
                        .ele('ImportoPagamento').txt(total.toFixed(2)).up()
                    .up()
                .up()
            .up()
        .doc()

        let content = doc.end({ prettyPrint: true })

        return content
}

module.exports.generateXml = generateXml