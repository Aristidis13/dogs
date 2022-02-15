import React,{ FunctionComponent } from 'react';
import { Link,BrowserRouter,Routes,Route } from 'react-router-dom';
import HomePage from '../Home/home'
import BreedsPage from '../Breeds/breeds'

const Header: FunctionComponent<any> = () => <header className="header">
    <BrowserRouter>
    <nav>
        <ul>
            <li className="nav-item">
                <Link to="/"> Random Dogs</Link>
            </li>
            <li className="nav-item">
                <Link to="breeds"> Breeds</Link>
            </li>
        </ul>
    <Routes>
      <Route path="/" element={<HomePage /> } />
      <Route path="breeds" element={<BreedsPage />}/>
    </Routes>
    </nav>
    </BrowserRouter>
</header>

export default Header;