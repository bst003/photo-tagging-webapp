import React, { useState } from "react";
import { Link } from "react-router-dom";

import { profanity } from "@2toad/profanity";

import formattedTime from "../misc/formatTime";

import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore/lite";

import "./TimeSubmissionForm.scss";

const TimeSubmissionForm = (props) => {
    const { levelCodeName, time } = props;

    const [submitted, setSubmitted] = useState(false);

    async function saveTime(submissionObj) {
        try {
            await addDoc(collection(getFirestore(), "gameScores"), {
                ...submissionObj,
                timestamp: serverTimestamp(),
            });

            console.log("the time has been added to the DB");
            setSubmitted(true);
        } catch (error) {
            console.error("Error saving time to Firebase Database", error);
        }
    }

    const submitTime = (e) => {
        e.preventDefault();

        const form = e.target;
        const nickname = form.querySelector("#nickname").value;

        if (profanity.exists(nickname)) {
            console.log("no profanity");
            const alert = form.querySelector(".form-alert");
            alert.innerText = "No profanity allowed, try using another nickname";
            return;
        }

        const submission = {
            time,
            nickname: nickname,
            levelCodeName: levelCodeName,
        };

        alert.innerText = "";
        saveTime(submission);

        // setSubmitted(true);

        console.log(e);
        console.log(time);
        console.log(levelCodeName);
        console.log(nickname);
    };

    return (
        <>
            {submitted ? (
                <p className="submission-alert">
                    Thanks for submitting your time. Head on over to the{" "}
                    <Link to="/leaderboards">leaderboards</Link> to see how you stack up.
                </p>
            ) : (
                <>
                    <p>
                        Congrats you beat this level in <strong>{formattedTime(time)}</strong>! You
                        should submit your score below and check the{" "}
                        <Link to="/leaderboards">leaderboards</Link> to see where you stand.
                    </p>
                    <form className="submit-time" onSubmit={submitTime}>
                        <div className="field-contain">
                            <label htmlFor="nickname">Nickname</label>
                            <input
                                id="nickname"
                                name="nickname"
                                type="text"
                                placeholder="Nickname"
                                minLength="3"
                                maxLength="20"
                                required
                            />
                        </div>
                        <div className="form-alert"></div>
                        <div className="btn submit-btn">
                            <button className="btn__link" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </>
            )}
        </>
    );
};

export default TimeSubmissionForm;
