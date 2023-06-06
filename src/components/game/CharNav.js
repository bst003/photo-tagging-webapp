import React, { useContext } from "react";

import uniqid from "uniqid";

import CharContext from "./CharContext.js";

import "./CharNav.scss";

const CharNav = () => {
    const chars = useContext(CharContext);

    console.log(chars);

    return (
        <div className="fg-char-nav">
            <h3 class="desktop-content">Characters</h3>
            <p class="desktop-content">Find all three of these characters to win the game.</p>
            <ul className="fg-char-nav__list">
                {chars.map((char) => {
                    return (
                        <li key={uniqid()} className={char.found ? "found" : ""}>
                            <span className="icon">
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
        </div>
    );
};

export default CharNav;
