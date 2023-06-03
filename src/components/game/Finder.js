import React, { useState } from "react";

import FinderCharSelect from "./FinderCharSelect.js";
import ContentBox from "./ContentBox.js";

import "./Finder.scss";

const Finder = (props) => {
    const { codename, label, gameOver, passCheckSelectCoords, startTheTimer } = props;

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
        // console.log(boundHoriWidth);
        // console.log(boundHoriWidthHalf);

        // console.log(clickCoords.x);

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

        // console.log(clickBounds);

        return clickBounds;
    };

    const calcCoordsPercent = (clickCoords, finderDimensions) => {
        return {
            x: (clickCoords.x / finderDimensions.width) * 100,
            y: (clickCoords.y / finderDimensions.height) * 100,
        };
    };

    const getCoords = (e) => {
        console.log(e);
        const coordX = e.nativeEvent.offsetX;
        const coordY = e.nativeEvent.offsetY;
        console.log(`coord X: ${coordX}`);
        console.log(`coord Y: ${coordY}`);

        return {
            x: Number(coordX),
            y: Number(coordY),
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

    const [charSelectActive, setCharSelectActive] = useState(false);

    const closeCharSelect = () => {
        setCharSelectActive(false);
    };

    const setCharSelectCoords = (e, coordsPercents) => {
        const fgFinder = e.target.parentElement;

        const charSelect = fgFinder.querySelector(".fg-char-select");
        charSelect.style.top = coordsPercents.y + "%";
        if (coordsPercents.x > 50) {
            charSelect.style.right = 100 - coordsPercents.x + "%";
            charSelect.style.left = "initial";
        } else {
            charSelect.style.left = coordsPercents.x + "%";
            charSelect.style.right = "initial";
        }
    };

    const [prevClickBounds, setPrevClickBounds] = useState({});
    const triggerClick = (e) => {
        const clickCoords = getCoords(e);
        const finderDimensions = getFinderDimensions(e);

        const coordsPercents = calcCoordsPercent(clickCoords, finderDimensions);

        setCharSelectCoords(e, coordsPercents);
        setCharSelectActive(true);

        console.log(` x pos: ${(clickCoords.x / finderDimensions.width) * 100}`);
        console.log(` y pos: ${(clickCoords.y / finderDimensions.height) * 100}`);

        console.log(calcCoordsPercent(clickCoords, finderDimensions));

        // calcClickBounds(clickCoords, finderDimensions);
        setPrevClickBounds(calcClickBounds(clickCoords, finderDimensions));

        console.log(prevClickBounds);
    };

    const onCharSelection = (codename) => {
        console.log("this is in Finder " + codename);

        passCheckSelectCoords(prevClickBounds, codename);

        closeCharSelect();
    };

    // Game Started State

    const [gameStarted, setGameStarted] = useState(false);

    const startGame = () => {
        setGameStarted(true);
        startTheTimer();
    };

    return (
        <div className="fg-finder">
            {gameOver ? (
                <ContentBox>
                    <h2>You Win!</h2>
                    <p>
                        Congrats you beat this level! You should submit your score below and check
                        the leaderboards to see where you stand.
                    </p>
                </ContentBox>
            ) : null}

            {gameStarted & !gameOver ? (
                <>
                    <img
                        onClick={triggerClick}
                        src={require(`../../assets/img/${codename}.png`)}
                        alt={label + " level"}
                    />
                    <FinderCharSelect
                        active={charSelectActive}
                        closeCharSelect={closeCharSelect}
                        passOnCharSelection={onCharSelection}
                    />
                </>
            ) : null}

            {!gameStarted ? (
                <ContentBox>
                    <h2>Let's Play!</h2>
                    <p>
                        Find all three characters in the nav to the left in order to win the game.
                        Compete to earn the top on spot on the leaderboard for each level. Good
                        luck!
                    </p>
                    <div className="btns-contain center">
                        <div className="btn">
                            <button className="btn__link" type="button" onClick={startGame}>
                                Start game
                            </button>
                        </div>
                    </div>
                </ContentBox>
            ) : null}
        </div>
    );
};

export default Finder;
