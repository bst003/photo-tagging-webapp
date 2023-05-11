import React from "react";

import "./FinderContain.scss";

const FinderContain = (props) => {
    const { children } = props;

    return (
        <section class="gf-contain">
            <div class="gf-contain__inner">{children}</div>
        </section>
    );
};

export default FinderContain;
