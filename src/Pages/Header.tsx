import { FunctionComponent } from 'react';
import { Link} from 'react-router-dom';


const Header: FunctionComponent<any> = () => <header className="header">
    <nav>
        <ul>
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

// <CheckComponent />