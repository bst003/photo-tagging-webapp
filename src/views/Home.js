import LevelSelect from "../components/home/LevelSelect";

const Home = () => {
    return (
        <div>
            <p>
                Welcome to Find Quest, a Where's Waldo style experience featuring some of our
                favorite gaming characters. Each level will challenge you to find three characters.
                To begin choose a level below.
            </p>
            <LevelSelect />
        </div>
    );
};

export default Home;
