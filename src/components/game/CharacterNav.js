import React from "react";

import "./CharacterNav.scss";

const CharacterNav = (props) => {
    const { chars } = props;

    return (
        <ul className="fg-char-nav">
            {chars.map((char) => {
                return <li>{char.label}</li>;
            })}
        </ul>
    );
};

export default CharacterNav;
