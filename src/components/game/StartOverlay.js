import React, { useState } from "react";

import "./StartOverlay.scss";

/*
Turn buttons into their own component?
*/

const StartOverlay = (props) => {
    const { triggerStartState } = props;

    const startGame = () => {
        triggerStartState();
    };

    return (
        <div className="start-overlay">
            <div className="start-overlay__inner">
                <h2>Let's Play!</h2>
                <p>
                    Find all three characters in the nav to the left in order to win the game.
                    Compete to earn the top on spot on the leaderboard for each level. Good luck!
                </p>
                <div className="btns-contain center">
                    <div className="btn">
                        <button className="btn__link" type="button" onClick={startGame}>
                            Start game
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartOverlay;
