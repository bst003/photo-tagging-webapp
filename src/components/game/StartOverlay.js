import React, { useState } from "react";

import "./StartOverlay.scss";

const StartOverlay = (props) => {
    const { triggerStartState } = props;

    const startGame = () => {
        triggerStartState();
    };

    return (
        <div className="start-overlay">
            <div class="start-overlay__inner">
                the game
                <button type="button" onClick={startGame}>
                    Start game
                </button>
            </div>
        </div>
    );
};

export default StartOverlay;
