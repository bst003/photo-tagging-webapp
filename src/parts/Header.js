import { Link } from "react-router-dom";

const Header = (props) => {
    return (
        <header className="site-header">
            <div className="site-header__inner">
                <div className="site-logo">
                    <Link to="/">Photo Tagging</Link>
                </div>
                Test
            </div>
        </header>
    );
};

export default Header;
