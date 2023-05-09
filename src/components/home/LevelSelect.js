import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, query } from "firebase/firestore/lite";

import LevelSelectCTA from "./LevelSelectCTA";

import "./LevelSelect.scss";

const LevelSelect = () => {
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
            console.log("sign out error: " + error);
        }
    };

    useEffect(() => {
        getLevels();
    }, []);

    return (
        <div className="level-select">
            {levelsList.map((levelsListItem) => {
                return (
                    <LevelSelectCTA
                        key={levelsListItem.id}
                        codename={levelsListItem.codename}
                        label={levelsListItem.label}
                    />
                );
            })}
        </div>
    );
};

export default LevelSelect;
