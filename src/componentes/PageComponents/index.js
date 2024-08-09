import iconSearch from "../../assets/icon-search.png"

// Componente referente ao "Header" das paginas marca, usuario, epi, home e periferico
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