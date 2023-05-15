import React from "react";

import "./Finder.scss";

const Finder = (props) => {
    const { codename, label } = props;

    // Used to calc a box with padding around click to check
    // if character is inside
    const calcClickBounds = (clickCoords, finderDimensions) => {
        console.log("getting bounding box for click");

        const boundHoriWidth = finderDimensions.width * 0.06;
        const boundHoriWidthHalf = boundHoriWidth / 2;
        console.log(boundHoriWidth);
        console.log(boundHoriWidthHalf);

        console.log(clickCoords.x);

        const clickBounds = {
            upperX: ((clickCoords.x + boundHoriWidthHalf) / finderDimensions.width) * 100,
            lowerX: ((clickCoords.x - boundHoriWidthHalf) / finderDimensions.width) * 100,
            upperY: ((clickCoords.y + boundHoriWidthHalf) / finderDimensions.height) * 100,
            lowerY: ((clickCoords.y - boundHoriWidthHalf) / finderDimensions.height) * 100,
        };

        console.log(clickBounds);

        return clickBounds;
    };

    const getCoords = (e) => {
        console.log(e);
        const coordX = e.nativeEvent.offsetX;
        const coordY = e.nativeEvent.offsetY;
        console.log(`coord X: ${coordX}`);
        console.log(`coord Y: ${coordY}`);

        return {
            x: Number(coordX),
            y: coordY,
        };
    };

    const getFinderDimensions = (e) => {
        const finderWidth = e.target.width;
        const finderHeight = e.target.height;
        console.log(`width: ${finderWidth}`);
        console.log(`height: ${finderHeight}`);

        return {
            width: finderWidth,
            height: finderHeight,
        };
    };

    const triggerClick = (e) => {
        const clickCoords = getCoords(e);
        const finderDimensions = getFinderDimensions(e);
        calcClickBounds(clickCoords, finderDimensions);
    };

    return (
        <figure className="fg-finder" onClick={triggerClick}>
            <img src={require(`../../assets/img/${codename}.png`)} alt={label + " level"} />
        </figure>
    );
};

export default Finder;
