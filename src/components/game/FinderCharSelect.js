import React, { useContext } from "react";

import uniqid from "uniqid";

import CharContext from "./CharContext.js";

import FinderCharSelectButton from "./FinderCharSelectButton.js";

import "./FinderCharSelect.scss";

const FinderCharSelect = (props) => {
    const { active } = props;

    const chars = useContext(CharContext);

    const makeSelection = (e) => {
        console.log(e);

        const codename = e.currentTarget;

        console.log(codename);
    };

    return (
        <ul className={`fg-char-select ${active ? "active" : ""}`}>
            {chars.reduce((accumulator, char) => {
                if (char.found) {
                    return accumulator;
                }

                return accumulator.concat(
                    <FinderCharSelectButton
                        key={uniqid()}
                        label={char.label}
                        codename={char.codename}
                    />
                );
            }, [])}
        </ul>
    );
};

export default FinderCharSelect;
