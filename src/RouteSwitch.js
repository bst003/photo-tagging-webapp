import React, { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./templates/MainLayout";
import SidebarLayout from "./templates/SidebarLayout";

import Game from "./views/Game";
import Home from "./views/Home";
import Leaderboard from "./views/Leaderboard";
import NotFound from "./views/NotFound";

const RouteSwitch = () => {
    return (
        <BrowserRouter basename="/photo-tagging-webapp">
            <Routes>
                <Route element={<SidebarLayout />}>
                    <Route path="/game/:slug" element={<Game />} />
                </Route>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/leaderboards" element={<Leaderboard />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;
