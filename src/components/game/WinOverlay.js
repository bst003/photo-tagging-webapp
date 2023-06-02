import React, { useState } from "react";

import "./WinOverlay.scss";

const WinOverlay = () => {
    return (
        <div className="win-overlay">
            <div class="win-overlay__content">
                <h2>You Win!</h2>

                <p>
                    Congrats you beat this level! You should submit your score below and check the
                    leaderboards to see where you stand.
                </p>
            </div>
        </div>
    );
};

export default WinOverlay;
