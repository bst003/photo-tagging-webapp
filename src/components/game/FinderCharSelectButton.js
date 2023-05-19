import React from "react";

import "./FinderCharSelectButton.scss";

const FinderCharSelectButton = (props) => {
    const { codename, label, found } = props;

    const makeSelection = (e) => {
        console.log(`you selected ${codename}`);
    };

    return (
        <li>
            <button
                className="fg-char-select-btn"
                type="button"
                data-value={codename}
                onClick={makeSelection}
            >
                {label}
            </button>
        </li>
    );
};

export default FinderCharSelectButton;
