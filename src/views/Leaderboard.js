import LeaderboardGrid from "../components/leaderboards/LeaderboardGrid";

const Leaderboard = () => {
    return (
        <div>
            <div className="intro-content">
                <h1 className="center-text">Leaderboards</h1>
                <p className="center-text">
                    Below are the top ten times for each level, try your best to make the list!
                </p>
            </div>

            <LeaderboardGrid />
        </div>
    );
};

export default Leaderboard;
