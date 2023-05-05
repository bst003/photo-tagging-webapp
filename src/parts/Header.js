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
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    `;

    const SiteLogo = styled.div`
        &.h2 {
            margin: 0px;
        }

        a {
            color: var(--offWhite);
            text-decoration: none;
        }
    `;

    return (
        <SiteHeader className="site-header">
            <div className="inner">
                <SiteLogo className="site-logo h2">
                    <Link to="/">Photo Tagging</Link>
                </SiteLogo>
                Test
            </div>
        </SiteHeader>
    );
};

export default Header;
