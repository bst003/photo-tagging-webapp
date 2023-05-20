import React from "react";

import "./FinderCharSelectButton.scss";

const FinderCharSelectButton = (props) => {
    const { codename, label, passOnCharSelection } = props;

    const triggerCharSelection = (e) => {
        console.log(`you selected ${codename}`);

        passOnCharSelection(codename);
    };

    return (
        <li>
            <button
                className="fg-char-select-btn"
                type="button"
                data-value={codename}
                onClick={triggerCharSelection}
            >
                {label}
            </button>
        </li>
    );
};

export default FinderCharSelectButton;
