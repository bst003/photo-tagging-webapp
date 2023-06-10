import React, { useContext } from "react";

import uniqid from "uniqid";

import CharContext from "./CharContext.js";

import "./CharNav.scss";

const CharNav = () => {
    const chars = useContext(CharContext);

    const toggleNav = (e) => {
        const button = e.currentTarget;
        const navList = button.nextSibling;

        if (button.classList.contains("active")) {
            button.innerText = "Show Chars";
            button.classList.remove("active");
            navList.classList.remove("active");
        } else {
            button.innerText = "Hide Chars";
            button.classList.add("active");
            navList.classList.add("active");
        }
    };

    return (
        <div className="fg-char-nav">
            <h3 className="desktop-content">Characters: </h3>
            <p className="desktop-content">Find all three of these characters to win the game.</p>

            <button
                className="mobile-content fg-char-nav__toggle"
                type="button"
                onClick={toggleNav}
            >
                Show Chars
            </button>

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
