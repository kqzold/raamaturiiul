import { Link } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Input } from '@heroui/react'

function NavbarComponent() {
  return (
    <Navbar isBordered className="py-2">
      <NavbarBrand>
        <Link to="/" className="font-bold text-xl">
          📚 RaamatuRiiul
        </Link>
      </NavbarBrand>
      
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link to="/catalog" className="hover:text-primary">
            Kataloog
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/sell" className="hover:text-primary">
            Müü raamatut
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Input
            type="search"
            placeholder="Otsi raamatuid..."
            size="sm"
            className="w-64 hidden md:block"
          />
        </NavbarItem>
        <NavbarItem>
          <Link to="/cart">
            <Button color="primary" variant="light">
              🛒 Korv
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/login">
            <Button color="primary" variant="flat">
              Logi sisse
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default NavbarComponent
