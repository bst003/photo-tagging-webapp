import LevelSelect from "../components/home/LevelSelect";

const Home = () => {
    return (
        <div>
            <div className="intro-content">
                <h1 className="center-text">Finder Game</h1>
                <p className="center-text large">
                    Welcome to Finder Game, a "Where's Waldo" style experience featuring some of our
                    favorite gaming characters. Each level will challenge you to find three
                    characters. To begin choose a level below.
                </p>
            </div>
            <LevelSelect />
        </div>
    );
};

export default Home;
