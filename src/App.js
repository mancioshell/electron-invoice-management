import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-block-ui/style.css'

import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { Menu } from 'components/Layout/Menu'
import { Footer } from 'components/Layout/Footer'
import { Messages } from 'components/Layout/Messages'

import { InsertInvoice } from 'pages/Invoice/InsertInvoice'
import { InvoiceList } from 'pages/Invoice/InvoiceList'
import { Invoice } from 'pages/Invoice/Invoice'
import { CustomerList } from 'pages/Customer/CustomerList'
import { InsertCustomer } from 'pages/Customer/InsertCustomer'
import { InsertSettings } from 'pages/Settings/InsertSettings'

import SettingsProvider from 'providers/SettingsProvider'
import UiProvider from 'providers/UiProvider'

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
