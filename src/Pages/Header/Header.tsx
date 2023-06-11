import { FunctionComponent } from "react";
import SearchBar from "./SearchBar";
import { pages } from "../../constants";
//@ts-ignore
import logo from "../../assets/logo/logo.svg";

export interface IHeader {
  setVisiblePage: Function;
  handleBreedSelection: Function;
}

const Header: FunctionComponent<IHeader> = ({
  setVisiblePage,
  handleBreedSelection
}) => {
  return (
    <header className="header">
      <img
        onClick={() => setVisiblePage(pages.home)}
        id="logo"
        src={logo}
        alt="Dog Lovers"
      />
      <nav className="nav">
        <ul className="nav-ul">
          <li onClick={() => setVisiblePage(pages.breeds)} className="nav-item">
            Breeds
          </li>
        </ul>
      </nav>
      <SearchBar
        urlForAPICall="breeds/list/all"
        handleBreedSelection={handleBreedSelection}
      />
    </header>
  );
};
export default Header;
