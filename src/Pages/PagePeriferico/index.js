import { useEffect, useState } from "react";
import LargeLoading from "../../componentes/LoadingAnimation/LargeLoading";
import MenuBar from "../../componentes/MenuBar";
import { fetchPerifericos } from "./api";
import TablePeriferico from "./TablePeriferico";
import { Link } from "react-router-dom";
import Paginacao from "../../componentes/Paginacao";
import TitleSearch from "../../componentes/PageComponents";


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
            if (perifericos.length === 0) {
                setCarregando(true);
            }
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

                {carregando ? (
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