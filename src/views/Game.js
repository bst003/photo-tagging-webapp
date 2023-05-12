import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { getFirestore, collection, getDocs, query, where } from "firebase/firestore/lite";

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

*/

const Game = () => {
    const params = useParams();

    const [levelData, setLevelData] = useState({});

    useEffect(() => {
        const getLevelData = async () => {
            try {
                const levelDataQuery = query(
                    collection(getFirestore(), "gameLevels"),
                    where("codename", "==", params.slug)
                );

                const levelDataQuerySnapshot = await getDocs(levelDataQuery);

                levelDataQuerySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    setLevelData(doc.data());
                });

                // setlevelsList(levelsArr);
            } catch (error) {
                console.log("Error fetching data: " + error);
            }
        };

        getLevelData();
    }, [params.slug]);

    return (
        <div>
            {levelData.label && (
                <>
                    <Sidebar>
                        <Timer />
                    </Sidebar>
                    <FinderContain>
                        <h1 className="fg-title">Level: {levelData.label}</h1>
                        <Finder codename={levelData.codename} label={levelData.label} />
                    </FinderContain>
                </>
            )}
        </div>
    );
};

export default Game;
