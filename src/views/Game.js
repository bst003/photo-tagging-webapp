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

/*

Sidebar
    - Timer Display
    - Character Nav Display (shows which characters need to be found, gray out on find)
FinderContain
    - Level Name Display
    - Finder (aka image container with onClick and client funcs)
        - Targeter (square/circle that show area included in click)
        - Which character nav (prompts user to choose which character is in targeter)

When character is found it will need to pass the found data up to Game so it can then be passed to sidebar children
    - Where is this data stored?
        - Add "found" key to levelData for each character?
        - Have a separate state array of found characters and compare to see if char is found?

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
WHAT CHAR DATA SHOULD I PASS DOWN TO FINDER AND FINDERCHARSELECT?
    - ONLY PASS DOWN NAME AND LABEL? THEN CHECK COORDS IN GAME?

THE DATA HAS TO BE VALIDATED AT "GAME" LEVEL SO THAT IT CAN PASS ANY CHANGES TO THE SIDEBAR TOO

USE CONTEXT TO SET CHAR DATA ON "GAME" LEVEL?
https://react.dev/learn/passing-data-deeply-with-context#step-3-provide-the-context
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


State for FinderCharSelect being visible?
    - If state is active (trigger on click), then show.
    - Set coordinates based on click coords
    - Add close button to finderCharSelect?

*/

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

            // levelDataQuerySnapshot.forEach((doc) => {
            //     console.log(doc.id, " => ", doc.data());

            //     const levelDataObj = {
            //         label: doc.data().label,
            //         codename: doc.data().codename,
            //     };

            //     const charDataArr = _trimCharData(doc.data().characters);

            //     setLevelData(levelDataObj);
            //     setCharData(charDataArr);
            // });
        } catch (error) {
            console.log("Error fetching data: " + error);
        }
    };

    useEffect(() => {
        const fillLevelState = async () => {
            const levelData = await getLevelData();

            levelData.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());

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

        console.log("this is in Game " + codename);
        console.log(coords);

        console.log(charData);
        const selectedCharIndex = charData.findIndex((char) => char.codename === codename);
        console.log(selectedCharIndex);

        const levelData = await getLevelData();
        levelData.forEach((doc) => {
            const chars = doc.data().characters;

            console.log(chars);

            const selectedChar = chars.find((char) => char.codename === codename);

            console.log(selectedChar);

            if (!selectedChar) {
                return;
            }

            console.log("selected char exists");

            if (
                coords.lowerX < selectedChar.coordX &&
                coords.upperX > selectedChar.coordX &&
                coords.lowerY < selectedChar.coordY &&
                coords.upperY > selectedChar.coordY
            ) {
                console.log("character is found");

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

                console.log(charData.length);

                console.log("post char data update");
            } else {
                toast.error("That guess is incorrect", {
                    duration: 2000,
                });
            }
        });
    };

    //////////////////////////////////////////////
    // DELETE WHEN DONE WITH BUILD
    //////////////////////////////////////////////
    useEffect(() => {
        console.log(charData);
    }, [charData]);

    // Timer Functions
    ///////////////////////////

    const [timer, setTimer] = useState(0);
    let timerInterval = useRef();

    const countTime = () => {
        timerInterval.current = setInterval(() => {
            setTimer((prevTime) => prevTime + 1);
            console.log("tick");
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
            console.log(charData.length);
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

        console.log("the game is over?");
        console.log(isGameOver());

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
                        <Sidebar>
                            <Timer time={timer} />
                            <CharNav />
                        </Sidebar>
                        <FinderContain>
                            <h1 className="fg-title">Level: {levelData.label}</h1>
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
