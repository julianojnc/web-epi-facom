import { useEffect, useState } from "react";
import iconSearch from "../../assets/icon-search.png"
import LargeLoading from "../../componentes/LoadingAnimation/LargeLoading";
import MenuBar from "../../componentes/MenuBar";
import { fetchPerifericos } from "./api";
import TablePeriferico from "./TablePeriferico";
import { Link } from "react-router-dom";
import Paginacao from "../../componentes/Paginacao";


const PagePeriferico = () => {

    const [perifericos, setPerifericos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [tamanhoPagina] = useState(10);

    useEffect(() => {
        const fetchAndSetPeriferico = async () => {
            setCarregando(true);
            const { lista, totalRegistros, totalPaginas } = await fetchPerifericos(paginaAtual, tamanhoPagina);
            setPerifericos(lista);
            setTotalRegistros(totalRegistros);
            setTotalPaginas(totalPaginas);
            setCarregando(false);
        };
        fetchAndSetPeriferico();
    }, [paginaAtual, tamanhoPagina]);

    const handlePageChange = (newPage) => {
        setPaginaAtual(newPage);
    };

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
                    <>
                        <TablePeriferico vetor={perifericos} />
                        <Paginacao
                            paginaAtual={paginaAtual}
                            totalPaginas={totalPaginas}
                            totalRegistros={totalRegistros}
                            onPageChange={handlePageChange}
                        />
                    </>
                )
                }

                <Link to='/cadastro-perifericos' className="button">Cadastrar</Link>
            </div>
        </section>
    )
}

export default PagePeriferico;