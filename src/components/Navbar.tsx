import { NavLink } from "react-router-dom"

const activeClassname = ({isActive}: {isActive: Boolean}) => isActive ? "navbar_link_active" : "";

const Navbar = () => {
  return (
    <header className="navbar">
        <nav>
            <NavLink className={activeClassname} to="">Theme 1</NavLink>
            <NavLink className={activeClassname} to="themeTwo">Theme 2</NavLink>
            <NavLink className={activeClassname} to="themeThree">Theme 3</NavLink>
            <h2>Order Tracking Page</h2>
        </nav>
    </header>
  )
}

export default Navbar

