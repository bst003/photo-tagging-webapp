import React from "react";

import formattedTime from "../misc/formatTime";

import "./Timer.scss";

const Timer = (props) => {
    const { time } = props;

    return (
        <div className="fg-timer">
            <h3>Time</h3>
            <p className="time">{formattedTime(time)}</p>
        </div>
    );
};

export default Timer;
