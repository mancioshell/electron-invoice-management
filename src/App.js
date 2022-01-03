import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'react-datepicker/dist/react-datepicker.css'

import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { Menu } from 'Components/Layout/Menu'
import { Footer } from 'Components/Layout/Footer'
import { Messages } from 'Components/Layout/Messages'

import { InsertInvoice } from 'Pages/Invoice/InsertInvoice'
import { InvoiceList } from 'Pages/Invoice/InvoiceList'
import { Invoice } from 'Pages/Invoice/Invoice'
import { CustomerList } from 'Pages/Customer/CustomerList'
import { InsertCustomer } from 'Pages/Customer/InsertCustomer'
import { InsertSettings } from 'Pages/Settings/InsertSettings'

import SettingsProvider from 'Providers/SettingsProvider'
import UiProvider from 'Providers/UiProvider'

function App() {
  return (
    <Router>
      <SettingsProvider>
        <Menu></Menu>

        <Container className="justify-content-md-center mt-5" fluid>
          <UiProvider>
            <Row>
              <Col md={{ span: 4, offset: 4 }}>
                <Messages></Messages>
              </Col>
            </Row>

            <Row className="min-container">
              <Col md={{ span: 10, offset: 1 }}>
                <Switch>
                  <Route path="/insert-invoice/customer/:customerId">
                    <InsertInvoice />
                  </Route>

                  <Route path="/insert-invoice">
                    <InsertInvoice />
                  </Route>

                  <Route path="/update-invoice/:id">
                    <InsertInvoice />
                  </Route>

                  <Route path="/invoice-list">
                    <InvoiceList />
                  </Route>

                  <Route path="/customer-list">
                    <CustomerList />
                  </Route>

                  <Route path="/update-customer/:customerId">
                    <InsertCustomer />
                  </Route>

                  <Route path="/invoice/:id">
                    <Invoice />
                  </Route>

                  <Route path="/insert-settings">
                    <InsertSettings />
                  </Route>

                  <Redirect to="/insert-invoice" />
                </Switch>
              </Col>
            </Row>

            <Row className="mt-5">
              <Col md={{ span: 10, offset: 1 }}>
                <Footer></Footer>
              </Col>
            </Row>
          </UiProvider>
        </Container>
      </SettingsProvider>
    </Router>
  )
}

export default App
