import React, { useContext } from "react";

import uniqid from "uniqid";

import CharContext from "./CharContext.js";

import FinderCharSelectButton from "./FinderCharSelectButton.js";

import "./FinderCharSelect.scss";

const FinderCharSelect = () => {
    const chars = useContext(CharContext);

    const makeSelection = (e) => {
        console.log(e);

        const codename = e.currentTarget;

        console.log(codename);

        // console.log(`you selected ${char.codename}`);
    };

    return (
        <ul className="fg-char-select">
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
