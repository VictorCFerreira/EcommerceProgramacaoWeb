import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/book-logo.png";
import AuthService from "@/services/AuthService";
import { Box, Button, CloseButton, Tooltip } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import "./style.css";

export function NavBar() {
  const navigate = useNavigate();

  const onClickCarrinho = () => {
    navigate(`/carrinho`);
  };

  const onClickLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <div className="navbar-fixed-top bg-white shadow-sm mb-2">
      <div className="container">
        <nav className="navbar navbar-light navbar-expand">
          <Link to="/" className="navbar-brand">
            <img src={logo} width="45" alt="LIVRO" />
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={(navData) =>
                    navData.isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>
            </ul>
            <Box display="flex" alignItems="center">
              <Button
                rightIcon={<FaShoppingCart />}
                colorScheme="blue"
                variant="outline"
                onClick={onClickCarrinho}
              >
                Carrinho
              </Button>
              <Tooltip hasArrow label="Sair" bg="red.600">
                <CloseButton ml="3" onClick={onClickLogout} />
              </Tooltip>
            </Box>
          </div>
        </nav>
      </div>
    </div>
  );
}
