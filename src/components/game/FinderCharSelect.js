import React from "react";

const FinderCharSelect = (props) => {
    const { chars } = props;

    return (
        <ul className="fg-char-select">
            {chars.map((char) => {
                console.log(char);
                return <li>{char.label}</li>;
            })}
        </ul>
    );
};

export default FinderCharSelect;
