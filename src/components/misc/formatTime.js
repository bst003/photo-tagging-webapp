const formattedTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const secondsString = seconds.toString().padStart(2, "0");

    const formattedTimeString = `${minutes}:${secondsString}`;

    return formattedTimeString;
};

export default formattedTime;
