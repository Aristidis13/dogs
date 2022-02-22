import { FunctionComponent } from 'react';
import { Link} from 'react-router-dom';
//@ts-ignore
import logo from "../assets/logo/logo.svg"

const Header: FunctionComponent<any> = () => <header className="header">
    <Link to="/">
        <img id="logo" src={logo} alt="Dog Lovers" />
    </Link>
    <nav className="nav">
        <ul className="nav-ul">
            <li className="nav-item">
                <Link to="/"> Random Dogs</Link>
            </li>
            <li className="nav-item">
                <Link to="/breeds"> Breeds</Link>
            </li>
        </ul>
    </nav>

</header>

export default Header;