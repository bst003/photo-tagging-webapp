import React, { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./MainLayout";

import Game from "./views/Game";
import Home from "./views/Home";
import Leaderboard from "./views/Leaderboard";
import NotFound from "./views/NotFound";

const RouteSwitch = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/play" element={<Game />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;
