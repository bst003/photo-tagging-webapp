import React, { useEffect, useState } from "react";

import { getFirestore, collection, getDocs, query } from "firebase/firestore/lite";

const LevelSelect = () => {
    const [levelsList, setlevelsList] = useState([]);
    const getLevels = async () => {
        try {
            console.log(getFirestore());
            const levelsQuery = query(collection(getFirestore(), "gameLevels"));
            console.log(levelsQuery);

            const levelsQuerySnapshot = await getDocs(levelsQuery);
            levelsQuerySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });
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
                return <div>Hello</div>;
            })}
        </div>
    );
};

export default LevelSelect;
