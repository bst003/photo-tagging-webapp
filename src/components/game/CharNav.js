import React from "react";

import "./CharNav.scss";

const CharNav = (props) => {
    const { chars } = props;

    return (
        <ul className="fg-char-nav">
            {chars.map((char) => {
                return <li>{char.label}</li>;
            })}
        </ul>
    );
};

export default CharNav;
