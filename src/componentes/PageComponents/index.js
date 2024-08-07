import iconSearch from "../../assets/icon-search.png"

const TitleSearch = ({ title, onSearchChange }) => {
    return (
        <div className="title">
            <h1>{title}</h1>
            <span>
                <input
                    className="input"
                    placeholder="Pesquisar..."
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                <span className="search-icon">
                    <img src={iconSearch} alt="icon"></img>
                </span>
            </span>
        </div>
    );
};

export default TitleSearch;