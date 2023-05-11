import React from "react";

import "./FinderSidebar.scss";

const FinderSidebar = (props) => {
    const { children } = props;

    return <aside class="gf-sidebar">{children}</aside>;
};

export default FinderSidebar;
