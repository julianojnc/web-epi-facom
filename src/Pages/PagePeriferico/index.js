import { useEffect, useState } from "react";
import iconSearch from "../../assets/icon-search.png"
import LargeLoading from "../../componentes/LoadingAnimation/LargeLoading";
import MenuBar from "../../componentes/MenuBar";
import { fetchPerifericos } from "./api";
import TablePeriferico from "./TablePeriferico";
import { Link } from "react-router-dom";


const PagePeriferico = () => {

    const [perifericos, setPerifericos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const fetchAndSetPeriferico = async () => {
          const fetchedPerifericos = await fetchPerifericos();
          setPerifericos(fetchedPerifericos);
        };
        fetchAndSetPeriferico();
      }, []);
    
      useEffect(() => {
        setCarregando(perifericos.length === 0);
      }, [perifericos]);

    return (
        <section>
            <MenuBar />

            <div className="content-page-epi">

                <div className="title">
                    <h1>PERIFÉRICOS</h1>

                    <span>
                        <input className="input" placeholder="Pesquisar..." />
                        <span className="search-icon">
                            <img src={iconSearch} alt="icon"></img>
                        </span>
                    </span>
                </div>

                {carregando ? (
                    <LargeLoading />
                ) : (
                    <TablePeriferico vetor={perifericos} />
                )
                }

                <Link to='/cadastro-perifericos' className="button">Cadastrar</Link>
            </div>
        </section>
    )
}

export default PagePeriferico;