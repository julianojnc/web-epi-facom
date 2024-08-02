import MenuBar from "../../componentes/MenuBar";
import TableEpi from "./TableEpi";
import iconSearch from "../../assets/icon-search.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEpi } from "./api/apiEpi";
import LargeLoading from "../../componentes/LoadingAnimation/LargeLoading";

const PageEpi = () => {
    const [epi, setEpi] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [tamanhoPagina] = useState(10);

    useEffect(() => {
        const fetchAndSetEpi = async () => {
            setCarregando(true);
            const { lista, totalRegistros, totalPaginas } = await fetchEpi(paginaAtual, tamanhoPagina);
            setEpi(lista);
            setTotalRegistros(totalRegistros);
            setTotalPaginas(totalPaginas);
            setCarregando(false);
        };
        fetchAndSetEpi();
    }, [paginaAtual, tamanhoPagina]);

    const handlePreviousPage = () => {
        if (paginaAtual > 0) {
            setPaginaAtual(paginaAtual - 1);
        }
    };

    const handleNextPage = () => {
        if (paginaAtual < totalPaginas - 1) {
            setPaginaAtual(paginaAtual + 1);
        }
    };

    return (
        <section>
            <MenuBar />
            <div className="content-page-epi">
                <div className="title">
                    <h1>EQUIPAMENTOS</h1>
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
                        <TableEpi vetor={epi} />
                        <div>
                            <p>Total de Registros: {totalRegistros}</p>
                            <p>Página {paginaAtual + 1} de {totalPaginas}</p>
                            <button onClick={handlePreviousPage} disabled={paginaAtual === 0}>
                                Página Anterior
                            </button>
                            <button onClick={handleNextPage} disabled={paginaAtual >= totalPaginas - 1}>
                                Próxima Página
                            </button>
                        </div>
                    </>
                )}

                <Link to='/cadastro-epi' className="button">Cadastrar</Link>
            </div>
        </section>
    );
};

export default PageEpi;
