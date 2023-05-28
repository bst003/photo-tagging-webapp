import React, { useContext } from "react";

import uniqid from "uniqid";

import CharContext from "./CharContext.js";

import "./CharNav.scss";

const CharNav = () => {
    const chars = useContext(CharContext);

    console.log(chars);

    return (
        <ul className="fg-char-nav">
            {chars.map((char) => {
                return (
                    <li key={uniqid()} className={char.found ? "found" : ""}>
                        {char.label}
                    </li>
                );
            })}
        </ul>
    );
};

export default CharNav;
