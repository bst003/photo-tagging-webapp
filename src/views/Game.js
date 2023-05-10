import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { getFirestore, collection, getDocs, query, where } from "firebase/firestore/lite";

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
                console.log("sign out error: " + error);
            }
        };

        getLevelData();
    }, [params.slug]);

    return (
        <div>
            Game {params.slug + " "}
            {levelData.label && levelData.label}
        </div>
    );
};

export default Game;
