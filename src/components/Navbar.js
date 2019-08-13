import React from 'react';
import {Link, NavLink} from "react-router-dom";
import './styles/Navbar.css'

const Navbar = () => {
    return(
        <nav className="nav-wrapper">
            <div className="container">
                <a href="/" className="brand-logo">My Page</a>
                <ul className="right">
                    <li><Link to="/">Home</Link></li>
                    <li><NavLink to="/svg">SVG</NavLink></li>
                    <li><NavLink to="/linear-svg">Linear SVG</NavLink></li>
                    <li><NavLink to="/gene-svg">Gene SVG</NavLink></li>
                    <li><NavLink to="/trna-svg">tRNA SVG</NavLink></li>
                    <li><NavLink to="/tree-svg">Tree SVG</NavLink></li>
                    <li><NavLink to="/rrna-svg">rRNA SVG</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;