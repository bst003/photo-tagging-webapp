import React from "react";

import "./Sidebar.scss";

const Sidebar = (props) => {
    const { children } = props;

    return <aside className="fg-sidebar">{children}</aside>;
};

export default Sidebar;
