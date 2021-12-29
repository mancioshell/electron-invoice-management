import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { SettingsContext } from 'Contexts/SettingsContext'

function Menu() {
  const history = useHistory()
  const [active, setActive] = useState('default')
  const { t } = useTranslation(['menu'])

  const { settings } = useContext(SettingsContext)

  useEffect(() => {
    return history.listen((location) => {
      const path = location.pathname.substring(1)
      const eventKey = path.startsWith('update-invoice')
        ? 'insert-invoice'
        : path
      setActive(eventKey)
    })
  }, [history])

  return (
    <Navbar bg="light" expand="lg">
      <LinkContainer to="/insert-invoice">
        <Navbar.Brand href="">
          <i className="fas fa-dumbbell"></i> {settings.brand}
        </Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav
          className="mr-auto"
          activeKey={active}
          onSelect={(selectedKey) => {
            setActive(selectedKey)
          }}>
          <NavDropdown
            title={
              <>
                <i className="fas fa-file-invoice"> </i> {t('items.invoice')}
              </>
            }
            id="invoice-nav-dropdown">
            <LinkContainer to="/insert-invoice">
              <NavDropdown.Item eventKey="insert-invoice">
                <i className="fas fa-plus"></i> {t('items.new-invoice')}
              </NavDropdown.Item>
            </LinkContainer>

            <LinkContainer as={NavDropdown.Item} to="/invoice-list">
              <NavDropdown.Item eventKey="invoice-list">
                <i className="fas fa-file-invoice"></i>{' '}
                {t('items.invoice-list')}
              </NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>

          <Nav.Item>
            <LinkContainer to="/customer-list">
              <Nav.Link eventKey="customer-list">
                <i className="fas fa-users"></i> {t('items.customer-list')}
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>

          <Nav.Item>
            <LinkContainer to="/insert-settings">
              <Nav.Link eventKey="insert-settings">
                <i className="fas fa-cogs"></i> {t('items.settings')}
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export { Menu }

export default Menu
