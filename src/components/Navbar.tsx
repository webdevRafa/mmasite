import { Link } from "react-router-dom"




export const Navbar: React.FC = () => {
    return <>
    <nav className="subdarker w-full fixed top-0 left-0 py-3 flex justify-between px-8">
        <p className="text-white">MMA BROS</p>
        <ul className="flex gap-3 offwhite">
          <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        </ul>
    </nav>
    </>
}