import React from "react";

import "./FinderContain.scss";

const FinderContain = (props) => {
    const { children } = props;

    return (
        <section className="fg-contain">
            <div className="fg-contain__inner">{children}</div>
        </section>
    );
};

export default FinderContain;
