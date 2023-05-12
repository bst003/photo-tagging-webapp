import React from "react";

import "./Finder.scss";

const Finder = (props) => {
    const { codename, label } = props;

    return (
        <figure className="fg-finder">
            <img src={require(`../../assets/img/${codename}.png`)} alt={label + " level"} />
        </figure>
    );
};

export default Finder;
