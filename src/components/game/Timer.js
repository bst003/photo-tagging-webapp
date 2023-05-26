import React from "react";

const Timer = (props) => {
    const { time } = props;
    return <p className="fg-timer">{time}</p>;
};

export default Timer;
