import React from "react";
// import styled from "styled-components";
import { Link } from "react-router-dom";

import "./Header.scss";

import Nav from "../components/elements/Nav.js";

const Header = (props) => {
    return (
        <header className="site-header">
            <div className="inner">
                <div className="site-logo h2">
                    <Link to="/">Find Quest</Link>
                </div>

                <Nav />
            </div>
        </header>
    );
};

export default Header;
