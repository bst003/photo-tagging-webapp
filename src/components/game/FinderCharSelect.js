import React from "react";

import uniqid from "uniqid";

const FinderCharSelect = (props) => {
    const { chars } = props;

    return (
        <ul className="fg-char-select">
            {chars.map((char) => {
                console.log(char);
                return <li key={uniqid()}>{char.label}</li>;
            })}
        </ul>
    );
};

export default FinderCharSelect;
