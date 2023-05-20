import React, { useContext } from "react";

import uniqid from "uniqid";

import CharContext from "./CharContext.js";

import FinderCharSelectButton from "./FinderCharSelectButton.js";

import "./FinderCharSelect.scss";

const FinderCharSelect = (props) => {
    const { active, closeCharSelect, passOnCharSelection } = props;

    const chars = useContext(CharContext);

    const onCharSelection = (codename) => {
        console.log("this is in FinderCharSelect " + codename);
        passOnCharSelection(codename);
    };

    return (
        <div className={`fg-char-select ${active ? "active" : ""}`}>
            <button type="button" onClick={closeCharSelect}>
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
                            passOnCharSelection={onCharSelection}
                        />
                    );
                }, [])}
            </ul>
        </div>
    );
};

export default FinderCharSelect;
