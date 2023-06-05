import React from "react";

import "./ContentBox.scss";

const ContentBox = (props) => {
    const { children } = props;

    return (
        <div className="content-box">
            <div className="content-box__inner">{children}</div>
        </div>
    );
};

export default ContentBox;
