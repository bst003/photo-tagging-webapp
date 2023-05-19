import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

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

*/

const Game = () => {
    const params = useParams();

    const [levelData, setLevelData] = useState({});
    const [charData, setCharData] = useState([]);

    useEffect(() => {
        const _trimCharData = (characters) => {
            const trimmedData = [];

            characters.forEach((character) => {
                const charObj = {
                    label: character.label,
                    codename: character.codename,
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

                levelDataQuerySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());

                    const levelDataObj = {
                        label: doc.data().label,
                        codename: doc.data().codename,
                    };

                    const charDataArr = _trimCharData(doc.data().characters);

                    setLevelData(levelDataObj);
                    setCharData(charDataArr);
                });

                // setlevelsList(levelsArr);
            } catch (error) {
                console.log("Error fetching data: " + error);
            }
        };

        getLevelData();
    }, [params.slug]);

    // const trimCharData = () => {
    //     if (levelData.characters) {
    //         const trimmedCharData = levelData.characters.map((character) => {
    //             return {
    //                 codename: character.codename,
    //                 label: character.label,
    //             };
    //         });

    //         console.log(trimmedCharData);
    //     }

    //     return;
    // };

    return (
        <div>
            {levelData.label && (
                <>
                    <CharContext.Provider value={charData}>
                        <Sidebar>
                            <Timer />
                            <CharNav />
                        </Sidebar>
                        <FinderContain>
                            <h1 className="fg-title">Level: {levelData.label}</h1>
                            <Finder codename={levelData.codename} label={levelData.label} />
                        </FinderContain>
                    </CharContext.Provider>
                </>
            )}
        </div>
    );
};

export default Game;
