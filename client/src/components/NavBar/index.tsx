import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/book-logo.png";
import AuthService from "@/services/AuthService";

export function NavBar() {
  const navigate = useNavigate();

  const onClickLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-sm mb-2">
      <div className="container">
        <nav className="navbar navbar-light navbar-expand">
          <Link to="/" className="navbar-brand">
            <img src={logo} width="45 " alt="LIVRO" />
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
              {/* <li className="nav-item">
                <NavLink
                  to="/categories"
                  className={(navData) =>
                    navData.isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Categorias
                </NavLink>
              </li> */}
            </ul>
            <div className="ms-auto">
              <button className="btn btn-light" onClick={onClickLogout}>
                &times; Sair
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
