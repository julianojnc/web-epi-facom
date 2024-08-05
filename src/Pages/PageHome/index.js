import MenuBar from "../../componentes/MenuBar";
// import TableEpi from "./TableEpi";
import iconSearch from "../../assets/icon-search.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LargeLoading from "../../componentes/LoadingAnimation/LargeLoading";
import Paginacao from "../../componentes/Paginacao";
import { fetchEpiUsuario } from "./api";
import TableEpiUsuario from "./TableEpiUsuario";

const PageHome = () => {
    const [epiUsuario, setEpiUsuario] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [tamanhoPagina] = useState(10);

    useEffect(() => {
        const fetchAndSetEpiUsuario = async () => {
            if (epiUsuario.length === 0) {
                setCarregando(true);
            }
            const { lista, totalRegistros, totalPaginas } = await fetchEpiUsuario(paginaAtual, tamanhoPagina);
            setEpiUsuario(lista);
            setTotalRegistros(totalRegistros);
            setTotalPaginas(totalPaginas);
            setCarregando(false);
        };
        fetchAndSetEpiUsuario();
    }, [paginaAtual, tamanhoPagina]);

    const handlePageChange = (newPage) => {
        setPaginaAtual(newPage);
    };

    return (
        <section>
            <MenuBar />
            <div className="content-page-epi">
                <div className="title">
                    <h1>HOME</h1>
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
                        <TableEpiUsuario vetor={epiUsuario} />
                        <Paginacao
                            paginaAtual={paginaAtual}
                            totalPaginas={totalPaginas}
                            totalRegistros={totalRegistros}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}

                <Link to='/cadastro-epi' className="button">Cadastrar</Link>
            </div>
        </section>
    );
};

export default PageHome;
