import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, query } from "firebase/firestore/lite";

import LeaderboardList from "./LeaderboardList";

import "./LeaderboardGrid.scss";

const LeaderboardGrid = () => {
    const [levelsList, setlevelsList] = useState([]);
    const getLevels = async () => {
        try {
            const levelsQuery = query(collection(getFirestore(), "gameLevels"));

            const levelsQuerySnapshot = await getDocs(levelsQuery);

            const levelsArr = [];
            levelsQuerySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());

                const levelObj = {
                    id: doc.id,
                    codename: doc.data().codename,
                    label: doc.data().label,
                };

                levelsArr.push(levelObj);
            });

            setlevelsList(levelsArr);
        } catch (error) {
            console.log("Error fetching levels: " + error);
        }
    };

    useEffect(() => {
        getLevels();
    }, []);

    return (
        <div className="leaderboard-grid">
            {levelsList.map((levelsListItem) => {
                return (
                    <LeaderboardList
                        levelLabel={levelsListItem.label}
                        levelCodeName={levelsListItem.codename}
                    />
                );
            })}
        </div>
    );
};

export default LeaderboardGrid;
