import { useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";

import toast, { Toaster } from "react-hot-toast";

import { getFirestore, collection, getDocs, query, where } from "firebase/firestore/lite";

import CharContext from "../components/game/CharContext.js";
import CharNav from "../components/game/CharNav.js";
import Finder from "../components/game/Finder.js";
import Sidebar from "../components/game/Sidebar.js";
import FinderContain from "../components/game/FinderContain.js";
import Timer from "../components/game/Timer.js";

const Game = () => {
    const params = useParams();

    const [levelData, setLevelData] = useState({});
    const [charData, setCharData] = useState([]);

    const _trimCharData = (characters) => {
        const trimmedData = [];

        characters.forEach((character) => {
            const charObj = {
                label: character.label,
                codename: character.codename,
                found: false,
            };

            trimmedData.push(charObj);
        });

        return trimmedData;
    };

    const getLevelData = async () => {
        try {
            const levelDataQuery = query(
                collection(getFirestore(), "gameLevels"),
                where("codename", "==", params.slug)
            );

            const levelDataQuerySnapshot = await getDocs(levelDataQuery);

            return levelDataQuerySnapshot;
        } catch (error) {
            console.log("Error fetching data: " + error);
        }
    };

    useEffect(() => {
        const fillLevelState = async () => {
            const levelData = await getLevelData();

            levelData.forEach((doc) => {
                const levelDataObj = {
                    label: doc.data().label,
                    codename: doc.data().codename,
                };

                const charDataArr = _trimCharData(doc.data().characters);

                setLevelData(levelDataObj);
                setCharData(charDataArr);
            });
        };

        fillLevelState();
    }, [params.slug]);

    // Check if the selected character is in the bounds of the coords
    const checkSelectCoords = async (coords, codename) => {
        // dismiss all prior toasts
        toast.dismiss();

        const selectedCharIndex = charData.findIndex((char) => char.codename === codename);

        const levelData = await getLevelData();
        levelData.forEach((doc) => {
            const chars = doc.data().characters;

            const selectedChar = chars.find((char) => char.codename === codename);

            if (!selectedChar) {
                return;
            }

            if (
                coords.lowerX < selectedChar.coordX &&
                coords.upperX > selectedChar.coordX &&
                coords.lowerY < selectedChar.coordY &&
                coords.upperY > selectedChar.coordY
            ) {
                const updatedCharData = {
                    label: charData[selectedCharIndex].label,
                    codename: charData[selectedCharIndex].codename,
                    found: true,
                };

                setCharData([
                    ...charData.slice(0, selectedCharIndex),
                    updatedCharData,
                    ...charData.slice(selectedCharIndex + 1, charData.length),
                ]);

                toast.success("Nice, you found " + charData[selectedCharIndex].label);
            } else {
                toast.error("That guess is incorrect", {
                    duration: 2000,
                });
            }
        });
    };

    // Timer Functions
    ///////////////////////////

    const [timer, setTimer] = useState(0);
    let timerInterval = useRef();

    const countTime = () => {
        timerInterval.current = setInterval(() => {
            setTimer((prevTime) => prevTime + 1);
        }, 1000);
    };

    const stopCountTime = () => {
        clearInterval(timerInterval.current);
    };

    useEffect(() => {
        return () => {
            stopCountTime();
        };
    }, []);

    // Game Status Functions
    ///////////////////////////

    const [gameOver, setGameOver] = useState(false);

    // Run when char data changes to check if all characters are found
    useEffect(() => {
        const isGameOver = () => {
            if (charData.length === 0) {
                return false;
            }

            let gameIsOver = true;

            for (let i = 0; i < charData.length; i++) {
                if (!charData[i].found) {
                    gameIsOver = false;
                    break;
                }
            }

            return gameIsOver;
        };

        if (isGameOver()) {
            setGameOver(true);
        }
    }, [charData]);

    // Run when game over is set to true and timer needs to be stopped
    useEffect(() => {
        if (gameOver === true) {
            stopCountTime();
        }
    }, [gameOver]);

    return (
        <div>
            {levelData.label && (
                <>
                    <CharContext.Provider value={charData}>
                        <h1 className="mobile-content center-text width-100">
                            Level: {levelData.label}
                        </h1>
                        <Sidebar>
                            <Timer time={timer} />
                            <CharNav />
                        </Sidebar>
                        <FinderContain>
                            <h1 className="desktop-content center-text">
                                Level: {levelData.label}
                            </h1>
                            <Finder
                                codename={levelData.codename}
                                label={levelData.label}
                                passCheckSelectCoords={checkSelectCoords}
                                gameOver={gameOver}
                                startTheTimer={countTime}
                                time={timer}
                            />
                        </FinderContain>
                    </CharContext.Provider>
                    <Toaster />
                </>
            )}
        </div>
    );
};

export default Game;
