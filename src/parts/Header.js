import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

const Header = (props) => {
    const SiteHeader = styled.header`
        background-color: var(--darkBlue);
        padding: 16px var(--siteHorizonalPadding);

        .inner {
            margin: 0 auto;
            max-width: var(--siteContentWidth);
            width: 100%;
        }
    `;

    return (
        <SiteHeader className="site-header">
            <div className="inner">
                <div className="site-logo">
                    <Link to="/">Photo Tagging</Link>
                </div>
                Test
            </div>
        </SiteHeader>
    );
};

export default Header;
