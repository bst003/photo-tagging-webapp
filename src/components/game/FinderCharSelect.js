import React, { useContext } from "react";

import uniqid from "uniqid";

import CharContext from "./CharContext.js";

import FinderCharSelectButton from "./FinderCharSelectButtons.js";

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
            {chars.map((char) => {
                console.log(char);
                return (
                    <FinderCharSelectButton
                        key={uniqid()}
                        label={char.label}
                        codename={char.codename}
                    />
                );
            })}
        </ul>
    );
};

export default FinderCharSelect;
