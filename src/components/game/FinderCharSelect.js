import React, { useContext } from "react";

import uniqid from "uniqid";

import CharContext from "./CharContext.js";

import FinderCharSelectButton from "./FinderCharSelectButton.js";

import "./FinderCharSelect.scss";

const FinderCharSelect = (props) => {
    const { active, closeSelect } = props;

    const chars = useContext(CharContext);

    const makeSelection = (e) => {
        console.log(e);

        const codename = e.currentTarget;

        console.log(codename);
    };

    return (
        <div className={`fg-char-select ${active ? "active" : ""}`}>
            <button type="button" onClick={closeSelect}>
                close
            </button>
            <ul>
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
        </div>
    );
};

export default FinderCharSelect;
