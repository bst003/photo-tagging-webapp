import React from "react";

import { profanity } from "@2toad/profanity";

import "./TimeSubmissionForm.scss";

const TimeSubmissionForm = (props) => {
    const { levelCodeName, time } = props;

    const submitTime = (e) => {
        e.preventDefault();

        const form = e.target;
        const nickname = form.querySelector("#nickname").value;

        if (profanity.exists(nickname)) {
            console.log("no profanity");
            const alert = form.querySelector(".form-alert");
            alert.innerText = "No profanity allowed, try using another nickname";
        } else {
            alert.innerText = "";
        }

        console.log(e);
        console.log(time);
        console.log(levelCodeName);
        console.log(nickname);
    };

    return (
        <form className="submit-time" onSubmit={submitTime}>
            <div className="field-contain">
                <label htmlFor="nickname">Nickname</label>
                <input
                    id="nickname"
                    name="nickname"
                    type="text"
                    placeholder="Nickname"
                    minLength="3"
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
    );
};

export default TimeSubmissionForm;
