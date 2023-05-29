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
                        <span class="icon">
                            <img
                                src={require(`../../assets/img/${char.codename}-icon.png`)}
                                alt={char.label + " icon"}
                            />
                        </span>

                        {char.label}
                    </li>
                );
            })}
        </ul>
    );
};

export default CharNav;
