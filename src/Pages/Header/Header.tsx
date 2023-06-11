import { FunctionComponent } from "react";
import SearchBar from "./SearchBar";
import { pages } from "../../constants";
//@ts-ignore
import logo from "../../assets/logo/logo.svg";
import { Divider } from "antd";

export interface IHeader {
  setVisiblePage: Function;
  handleBreedSelection: Function;
}

const Header: FunctionComponent<IHeader> = ({
  setVisiblePage,
  handleBreedSelection
}) => {
  return (
    <>
      <header className="header">
        <figure
          className="logo-container isLink"
          onClick={() => setVisiblePage(pages.home)}
        >
          <img id="logo" src={logo} alt="Dog Lovers" />
          <figcaption className="nav-item">Dog Lovers</figcaption>
        </figure>
        <nav className="nav">
          <ul className="nav-ul">
            <li
              onClick={() => setVisiblePage(pages.breeds)}
              className="nav-item isLink"
            >
              Breeds
            </li>
          </ul>
        </nav>
        <SearchBar
          urlForAPICall="breeds/list/all"
          handleBreedSelection={handleBreedSelection}
        />
      </header>
      <Divider />
    </>
  );
};
export default Header;
