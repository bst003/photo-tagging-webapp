import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const RouteSwitch = () => {
    return (
        <BrowserRouter basename="/react-shopping-cart">
            <Routes></Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;
