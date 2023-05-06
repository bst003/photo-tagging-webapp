import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../parts/Header";

const SidebarLayout = (props) => {
    return (
        <div>
            <Header />
            <main className="site-main">
                <div className="site-main__inner no-contain">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default SidebarLayout;
