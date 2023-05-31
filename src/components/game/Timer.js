import React from "react";

import "./Timer.scss";

const Timer = (props) => {
    const { time } = props;

    const formattedTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        const secondsString = seconds.toString().padStart(2, "0");

        const formattedTimeString = `${minutes}:${secondsString}`;

        return formattedTimeString;
    };

    return (
        <div className="fg-timer">
            <h3>Time</h3>
            <p className="time">{formattedTime()}</p>
        </div>
    );
};

export default Timer;
