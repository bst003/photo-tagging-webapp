import React, { useContext } from "react";

import uniqid from "uniqid";

import CharContext from "./CharContext.js";

import "./CharNav.scss";

const CharNav = () => {
    const chars = useContext(CharContext);

    return (
        <ul className="fg-char-nav">
            {chars.map((char) => {
                return <li key={uniqid()}>{char.label}</li>;
            })}
        </ul>
    );
};

export default CharNav;
