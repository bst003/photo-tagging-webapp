import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/*

TOOLS/KITS TO TRY/INCLUDE
    - PropTypes
    - Styled Components
    - Higher Order Components

ROUTING
    - Will need RouteSwitch file
    - ROUTES
        - Start 
        - Game
        - Scoreboard/Play Again
    
ORGANIZATION
    - HOW TO BREAK DOWN DIRECTORIES
        - Components
            - Elements sub folder for below items
                - Items such as buttons, content containers.
            - Folder for each compontent based on context 
                - IE: folder for start screen components, folder for game components, 
                  folder for scorebopard components
        - Views
            - The main template files
        - Parts
            - Stuff like Header and Footer?

FUNCTIONALITY
    1. 

*/

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
