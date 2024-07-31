// src/pages/PageEpi.js
import MenuBar from "../../componentes/MenuBar";
import TableEpi from "./TableEpi";
import iconSearch from "../../assets/icon-search.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEpi } from "./api/apiEpi";

const PageEpi = () => {
    const [epi, setEpi] = useState([]);
    const [carregandoEpi, setCarregandoEpi] = useState(true);

    useEffect(() => {
        const fetchAndSetEpi = async () => {
            const fetchedEpi = await fetchEpi();
            setEpi(fetchedEpi);
        };
        fetchAndSetEpi();
    }, []);

    useEffect(() => {
        setCarregandoEpi(epi.length === 0);
    }, [epi]);

    return (
        <section>
            <MenuBar />
            <div className="content-page-epi">
                <div className="title">
                    <h1>Equipamentos</h1>
                    <span>
                        <input className="input" placeholder="Pesquisar..." />
                        <span className="search-icon">
                            <img src={iconSearch} alt="icon"></img>
                        </span>
                    </span>
                </div>
                <TableEpi vetor={epi} />
                <Link to='/cadastro-epi' className="button">Cadastrar</Link>
            </div>
        </section>
    );
};

export default PageEpi;
