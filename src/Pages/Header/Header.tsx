import { FunctionComponent } from 'react';
import { Link} from 'react-router-dom';
import SearchBar from './SearchBar';
//@ts-ignore
import logo from "../../assets/logo/logo.svg"

export interface NoProps {}

const Header: FunctionComponent<NoProps> = () => {
    return (<header className="header">
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
    <SearchBar idOfSearchBar="breedsSearch" placeholder="Hi, I search things" urlForAPICall='breeds/list/all' />
</header>);}
export default Header;