import { Link } from "react-router-dom";
import CheckLogo from "../../assets/icons/CheckLogo";
import "./navbar.css";
export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <span>Purple Check</span>
        <CheckLogo size={30} color="#724ebf" />
      </div>
      <ul className="navbar__menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/iframe-flow">iFrame Flow</Link>
        </li>
        <li>
          <Link to="/sms-flow">SMS Flow</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <div className="navbar__auth">
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};
