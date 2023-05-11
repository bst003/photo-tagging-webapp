import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./LevelSelectCTA.scss";

const LevelSelectCTA = (props) => {
    const { codename, label } = props;

    return (
        <Link className="level-select-cta" type="button" to={"/game/" + codename}>
            <img src={require(`../../assets/img/${codename}-thumb.jpg`)} alt={label + " level"} />
            <span>{label}</span>
        </Link>
    );
};

export default LevelSelectCTA;
