import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scss/base.scss";
import "normalize.css";

import RouteSwitch from "./RouteSwitch";

import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebaseConfig.js";

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouteSwitch></RouteSwitch>
    </React.StrictMode>
);
