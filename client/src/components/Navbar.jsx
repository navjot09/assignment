import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li>
          <Link className="nav__item" to={"/"}>
            Home
          </Link>
        </li>
        <li>
          <Link className="nav__item" to={"/new"}>
            New Meeting
          </Link>
        </li>
      </ul>
    </nav>
  );
}
