import React, { useEffect, useState } from "react";
import {
    collection,
    getFirestore,
    getDocs,
    limit,
    orderBy,
    query,
    where,
} from "firebase/firestore/lite";

// import LevelSelectCTA from "./LevelSelectCTA";

// import "./LevelSelect.scss";

const LeaderboardList = (props) => {
    const { levelLabel, levelCodeName } = props;

    const [bestTimes, setBestTimes] = useState([]);
    const getTimes = async () => {
        try {
            const timesQuery = query(
                collection(getFirestore(), "gameScores"),
                where("levelCodeName", "==", levelCodeName),
                orderBy("time", "asc"),
                limit(10)
            );

            const timesQuerySnapshot = await getDocs(timesQuery);

            const timesArr = [];
            timesQuerySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());

                const timeObj = {
                    id: doc.id,
                    nickname: doc.data().nickname,
                    time: doc.data().time,
                };

                timesArr.push(timeObj);
            });

            setBestTimes(timesArr);
        } catch (error) {
            console.log("Error fetching times: " + error);
        }
    };

    useEffect(() => {
        getTimes();
    }, []);

    return (
        <div className="leaderboard-grid-item">
            <h2>{levelLabel}</h2>
            <ol className="leaderboard-list">
                {bestTimes.map((timeItem) => {
                    return <li key={timeItem.id}>{timeItem.nickname + " " + timeItem.time}</li>;
                })}
            </ol>
        </div>
    );
};

export default LeaderboardList;
