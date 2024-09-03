import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPerifericos } from ".//api/apiPeriferico";
import MenuBar from "../../componentes/MenuBar";
import LargeLoading from "../../componentes/LoadingAnimation/LargeLoading";
import TitleSearch from "../../componentes/PageComponents/PagePrincipalHeader";
import TablePeriferico from "./TablePeriferico";
import Paginacao from "../../componentes/Paginacao";

const PagePeriferico = () => {

    const [perifericos, setPerifericos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [tamanhoPagina] = useState(10);
    const [searchTerm, setSearchTerm] = useState(''); // Hook para o filtro de pesquisa

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

    // Filtro de pesquisa
    const filter = perifericos.filter((item) => {
        return (
            (item.nome ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.patrimonio ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.serviceTag ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.expressCode ?? '').toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const handlePageChange = (newPage) => {
        setPaginaAtual(newPage);
    };

    return (
        <section>
            <MenuBar />

            <div className="content-page">

                <TitleSearch title="Periféricos" onSearchChange={setSearchTerm} />

                {carregando || perifericos.length === 0 ? (
                    <LargeLoading />
                ) : (
                    <>
                        <TablePeriferico vetor={filter} />
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