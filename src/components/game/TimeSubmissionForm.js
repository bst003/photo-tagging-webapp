import React from "react";

const TimeSubmissionForm = (props) => {
    const submitTime = () => {};

    return (
        <form onSubmit={submitTime}>
            <div className="field-contain">
                <label for="nickname">Nickname</label>
                <input id="nickname" name="nickname" type="text" placeholder="Nickname" />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default TimeSubmissionForm;
