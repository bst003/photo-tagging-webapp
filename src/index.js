import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scss/base.scss";
import "normalize.css";
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
        - Score/Play Again (Will have option to submit score)
            - DOES THIS NEED TO BE ITS OWN ROUTE?
        - Leaderboard
    
ORGANIZATION
    - HOW TO BREAK DOWN DIRECTORIES
        - Components
            - Elements sub folder for below items
                - Items such as buttons, content containers.
            - Folder for each compontent based on context 
                - IE: folder for start screen components, folder for game components, 
                  folder for scoreboard components, folder for timer components
        - Views
            - The main template files
        - Parts
            - Stuff like Header and Footer?

GAMEFLOW
    1. User lands on start page that has two options, Start Game and Leaderboard
        - Start Game leads to Game View
        - Leaderboard leads to Leaderboard view
    2. User lands on the Game page
        - Once the view loads the timer will start to count down
            - Where to store timer ingo?
        - User will be able to click on picture element and will track clicks with Mouse 
          Event (offsetX/Y) + 100 or so px in each direction (USE SOMETHING DYNAMIC LIKE PERCENT)
          https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX
            - offsetX returns value in px. That will have to be converted to percents and 
              then use those percents to render the targeter
        - When user clicks a dropdown of options will be shown with the name of each character.
            - The dropdown will remove items already found
        - Will then verify if those coordinates match what is stored in Firebase for the 
          character selected.
            - If correct a pin will be placed in that area of the image and an alert will appear in green
            - If incorrect an alert will appear in red
        - Once the user finds all of the characters they will get have a way to 
          enter their name and submit their score. This will be a popup or a whole new view.
            - This popup/view will also have buttons to restart and view leaderboard
    3. 

*/

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        {/* <App /> */}
        Hello World
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
