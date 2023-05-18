import React from "react";

const FinderCharSelectButton = (props) => {
    const { codename, label } = props;

    const makeSelection = (e) => {
        console.log(`you selected ${codename}`);
    };

    return (
        <li>
            <button type="button" data-value={codename} onClick={makeSelection}>
                {label}
            </button>
        </li>
    );
};

export default FinderCharSelectButton;
