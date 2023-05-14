import React from "react";

import "./Finder.scss";

const Finder = (props) => {
    const { codename, label } = props;

    const getCoords = (e) => {
        console.log(e);
        const coordX = e.nativeEvent.offsetX;
        const coordY = e.nativeEvent.offsetY;
        console.log(`coord X: ${coordX}`);
        console.log(`coord Y: ${coordY}`);

        return [coordX, coordY];
    };

    const calcClickBounds = (clickCoords) => {
        console.log("getting bounding box for click");
    };

    const getFinderDimensions = (e) => {
        const finderWidth = e.target.width;
        const finderHeight = e.target.height;
        console.log(`width: ${finderWidth}`);
        console.log(`height: ${finderHeight}`);

        return [finderWidth, finderHeight];
    };

    const triggerClick = (e) => {
        const clickCoords = getCoords(e);
        const finderDimensions = getFinderDimensions(e);
        calcClickBounds();
    };

    return (
        <figure className="fg-finder" onClick={triggerClick}>
            <img src={require(`../../assets/img/${codename}.png`)} alt={label + " level"} />
        </figure>
    );
};

export default Finder;
