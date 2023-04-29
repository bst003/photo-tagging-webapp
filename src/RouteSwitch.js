import React, { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebaseConfig.js";

const RouteSwitch = () => {
    useEffect(() => {
        const firebaseAppConfig = getFirebaseConfig();
        initializeApp(firebaseAppConfig);
    }, []);

    return (
        <BrowserRouter basename="/react-shopping-cart">
            <Routes></Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;
