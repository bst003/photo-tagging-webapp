import React, { useState } from "react";

const StartOverlay = (props) => {
    const { triggerStartState } = props;

    const startGame = () => {
        triggerStartState();
    };

    return (
        <div className="start-overlay">
            the game
            <button type="button" onClick={startGame}>
                Start game
            </button>
        </div>
    );
};

export default StartOverlay;
