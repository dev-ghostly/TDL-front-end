import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar(){
    return <header>
        <nav className="font-website flex pt-5 justify-between max-w-6xl mx-auto">
            <Logo />
            <ul className="flex space-x-4 text-sm">
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/signup">Sign Up</Link>
                </li>
            </ul>
        </nav>
    </header>
}