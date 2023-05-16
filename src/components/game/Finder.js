import React from "react";

import FinderCharSelect from "./FinderCharSelect.js";

import "./Finder.scss";

const Finder = (props) => {
    const { chars, codename, label } = props;

    // Used to update any bounds less than 0 or greater than 100
    const adjustAbnormalBounds = (bound) => {
        if (bound < 0) {
            return 0;
        }

        if (bound > 100) {
            return 100;
        }

        return bound;
    };

    // Used to calc a box with padding around click to check
    // Accomplish by creating a square that is 6% of the width of the
    // image. The click coords are passed so that you can add and subtract
    // 3% of the width of the image to the x and y coord to create the
    // bounding box. The box is then converted into percents of the
    // overall finder width and height. These values will then be
    // checked against the values that exist for each character in the
    // firebase database.
    const calcClickBounds = (clickCoords, finderDimensions) => {
        console.log("getting bounding box for click");

        const boundHoriWidth = finderDimensions.width * 0.065;
        const boundHoriWidthHalf = boundHoriWidth / 2;
        console.log(boundHoriWidth);
        console.log(boundHoriWidthHalf);

        console.log(clickCoords.x);

        const clickBounds = {
            upperX: adjustAbnormalBounds(
                ((clickCoords.x + boundHoriWidthHalf) / finderDimensions.width) * 100
            ),
            lowerX: adjustAbnormalBounds(
                ((clickCoords.x - boundHoriWidthHalf) / finderDimensions.width) * 100
            ),
            upperY: adjustAbnormalBounds(
                ((clickCoords.y + boundHoriWidthHalf) / finderDimensions.height) * 100
            ),
            lowerY: adjustAbnormalBounds(
                ((clickCoords.y - boundHoriWidthHalf) / finderDimensions.height) * 100
            ),
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

        console.log(` x pos: ${(clickCoords.x / finderDimensions.width) * 100}`);
        console.log(` y pos: ${(clickCoords.y / finderDimensions.height) * 100}`);

        calcClickBounds(clickCoords, finderDimensions);
    };

    return (
        <figure className="fg-finder" onClick={triggerClick}>
            <img src={require(`../../assets/img/${codename}.png`)} alt={label + " level"} />
            <FinderCharSelect chars={chars} />
        </figure>
    );
};

export default Finder;
