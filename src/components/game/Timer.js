import React from "react";

const Timer = (props) => {
    const { time } = props;

    const formattedTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        const secondsString = seconds.toString().padStart(2, "0");

        const formattedTimeString = `${minutes}:${secondsString}`;

        return formattedTimeString;
    };

    return <p className="fg-timer">{formattedTime()}</p>;
};

export default Timer;
