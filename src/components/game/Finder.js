import React, { useState } from "react";

import FinderCharSelect from "./FinderCharSelect.js";
import ContentBox from "./ContentBox.js";
import TimeSubmissionForm from "./TimeSubmissionForm.js";
import formattedTime from "../misc/formatTime";

import "./Finder.scss";

const Finder = (props) => {
    const { codename, label, gameOver, passCheckSelectCoords, startTheTimer, time } = props;

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
        const boundHoriWidth = finderDimensions.width * 0.065;
        const boundHoriWidthHalf = boundHoriWidth / 2;

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

        return clickBounds;
    };

    const calcCoordsPercent = (clickCoords, finderDimensions) => {
        return {
            x: (clickCoords.x / finderDimensions.width) * 100,
            y: (clickCoords.y / finderDimensions.height) * 100,
        };
    };

    const getCoords = (e) => {
        const coordX = e.nativeEvent.offsetX;
        const coordY = e.nativeEvent.offsetY;

        return {
            x: Number(coordX),
            y: Number(coordY),
        };
    };

    const getFinderDimensions = (e) => {
        const finderWidth = e.target.width;
        const finderHeight = e.target.height;

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

        setPrevClickBounds(calcClickBounds(clickCoords, finderDimensions));
    };

    const onCharSelection = (codename) => {
        passCheckSelectCoords(prevClickBounds, codename);

        closeCharSelect();
    };

    // Game Started State
    ///////////////////////////

    const [gameStarted, setGameStarted] = useState(false);

    const startGame = () => {
        setGameStarted(true);
        startTheTimer();
    };

    return (
        <div className="fg-finder">
            {gameOver ? (
                <ContentBox>
                    <h2>You Won in {formattedTime(time)}!</h2>
                    <TimeSubmissionForm time={time} levelCodeName={codename} />
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
                        Find all three characters in the nav which can be found to the left on
                        desktop and under the "Show Chars" button on mobile in order to win the
                        game. Compete to earn the top on spot on the leaderboard for each level.
                        Good luck!
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
