import Link from "next/link";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" href={"#"}>Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" href={"/blogs"} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Blogs
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" href={"#"}>Action</Link></li>
            <li><Link className="dropdown-item" href={"#"}>Another action</Link></li>
            <li> </li>
            <li><Link className="dropdown-item" href={"#"}>Something else here</Link></li>
          </ul>
        </li>
       
      </ul>
      <form className="d-flex">
       
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
  )
}
