import React, { useState } from "react";

const LevelSelectCTA = (props) => {
    const { codename, label } = props;

    return <div className="level-select-cta">{label}</div>;
};

export default LevelSelectCTA;
