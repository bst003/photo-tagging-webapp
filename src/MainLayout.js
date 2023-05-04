import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./parts/Header";

const MainLayout = (props) => {
    return (
        <div>
            <Header />
            <main className="site-main">
                <div className="site-main__inner">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
