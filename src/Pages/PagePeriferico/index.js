import { Link } from "react-router-dom";
import { useState } from "react";
import useSWR from 'swr';
import { fetchPerifericos } from ".//api/apiPeriferico";
import MenuBar from "../../componentes/MenuBar";
import LargeLoading from "../../componentes/LoadingAnimation/LargeLoading";
import TitleSearch from "../../componentes/PageComponents/PagePrincipalHeader";
import TablePeriferico from "./TablePeriferico";
import Paginacao from "../../componentes/Paginacao";

// Definindo o fetcher para SWR usando o método fetchPerifericos com paginação
const fetcher = (url, page, size) => fetchPerifericos(page, size);

const PagePeriferico = () => {
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [tamanhoPagina] = useState(10);
    const [searchTerm, setSearchTerm] = useState(''); // Hook para o filtro de pesquisa

    // Usando SWR para buscar os periféricos
    const { data, error, isLoading } = useSWR(
        ['fetchPerifericos', paginaAtual, tamanhoPagina],  // chave única para cache
        () => fetcher('fetchPerifericos', paginaAtual, tamanhoPagina),  // fetcher function
        { revalidateOnFocus: false, revalidateOnReconnect: true }  // configurações SWR
    );

    // Se ocorrer algum erro na requisição
    if (error) {
        console.error('Erro ao carregar periféricos:', error);
        return <div>Erro ao carregar dados.</div>;
    }

    // Carregando dados
    if (isLoading || !data) {
        return <LargeLoading />;
    }

    const { lista: perifericos, totalRegistros, totalPaginas } = data;

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

                {filter.length === 0 ? (
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
                )}

                <Link to='/cadastro-perifericos' className="button">Cadastrar</Link>
            </div>
        </section>
    );
};

export default PagePeriferico;
