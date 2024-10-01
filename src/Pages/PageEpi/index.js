import { Link } from "react-router-dom";
import { useState } from "react";
import useSWR from 'swr';
import { fetchEpi } from "./api/apiEpi";
import MenuBar from "../../componentes/MenuBar";
import LargeLoading from "../../componentes/LoadingAnimation/LargeLoading";
import TitleSearch from "../../componentes/PageComponents/PagePrincipalHeader";
import TableEpi from "./TableEpi";
import Paginacao from "../../componentes/Paginacao";
import PageNotFound from "../PageNotFound";

// Definindo o fetcher para SWR usando o método fetchEpi com paginação
const fetcher = (url, page, size) => fetchEpi(page, size);

const PageEpi = () => {
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [tamanhoPagina] = useState(10);
    const [searchTerm, setSearchTerm] = useState(''); // Hook para o filtro de pesquisa

    // Usando SWR para buscar os epi
    const { data, error, isLoading } = useSWR(
        ['fetchEpi', paginaAtual, tamanhoPagina],  // chave única para cache
        () => fetcher('fetchEpi', paginaAtual, tamanhoPagina),  // fetcher function
        { revalidateOnFocus: false, revalidateOnReconnect: true }  // configurações SWR
    );

    // Se ocorrer algum erro na requisição
    if (error) {
        console.error('Erro ao carregar Equipamentos:', error);
        return <PageNotFound />;
    }

    // Carregando dados
    if (isLoading || !data) {
        return <LargeLoading />;
    }

    const { lista: epi, totalRegistros, totalPaginas } = data;

    // Filtro de pesquisa
    const filter = epi.filter((item) => {
        return (
            (item.nome ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.patrimonio ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.local ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.setor ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                <TitleSearch title="Equipamentos" onSearchChange={setSearchTerm} />

                {filter.length === 0 ? (
                    <LargeLoading />
                ) : (
                    <>
                        <TableEpi vetor={filter} />
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

export default PageEpi;
