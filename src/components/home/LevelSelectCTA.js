import React, { useState } from "react";

const LevelSelectCTA = (props) => {
    const { codename, label } = props;

    const startGame = () => {
        console.log(codename);
    };

    return (
        <button className="level-select-cta" type="button" onClick={startGame}>
            <img src={require(`../../assets/img/${codename}-thumb.jpg`)} alt={label + " level"} />
            {label}
        </button>
    );
};

export default LevelSelectCTA;
