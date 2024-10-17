import { Link } from "react-router-dom";
import { useState } from "react";
import useSWR from 'swr';
import { fetchEpi } from "./api/apiEpi";
import TitleSearch from "../../componentes/PageComponents/PagePrincipalHeader";
import TableEpi from "./TableEpi";
import PageNotFound from "../PageNotFound";
import ModalLoading from "../../componentes/Modal/ModalLoading"
import PageContent from "../../componentes/PageComponents/PageContent";
import LoadingTable from "../../componentes/PageComponents/PagePrincipalLoadingTables";

// Definindo o fetcher para SWR usando o método fetchEpi com paginação
const fetcher = () => fetchEpi(0, 9999);

const PageEpi = () => {
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [tamanhoPagina] = useState(10);
    const [searchTerm, setSearchTerm] = useState(''); // Hook para o filtro de pesquisa

    // Usando SWR para buscar os epi
    const { data, error, isLoading } = useSWR('fetchEpi', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });

    // Se ocorrer algum erro na requisição
    if (error) {
        console.error('Erro ao carregar Equipamentos:', error);
        return <PageNotFound />;
    }

    // Carregando dados
    if (isLoading || !data) {
        return (
            <PageContent>
                <ModalLoading />
            </PageContent>
        );
    }

    const { lista: epi } = data;

    // Filtro de pesquisa
    const filter = epi.filter((item) => {
        return (
            (item.nome ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.patrimonio ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.local ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.setor ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.expressCode ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.serviceTag ?? '').toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const inicio = paginaAtual * tamanhoPagina;
    const fim = inicio + tamanhoPagina;
    const itensPaginados = filter.slice(inicio, fim);

    const handlePageChange = (newPage) => {
        setPaginaAtual(newPage);
    };

    return (
        <PageContent>
            <TitleSearch title="Equipamentos" onSearchChange={setSearchTerm} />

            <LoadingTable
                isLoading={isLoading}
                mensagemRetorno={"Nenhum equipamento encontrado!"}
                paginaAtual={paginaAtual}
                totalPaginas={Math.ceil(filter.length / tamanhoPagina)}
                totalRegistros={filter.length}
                handlePageChange={handlePageChange}
                filter={itensPaginados}
            >
                <TableEpi vetor={itensPaginados} />
            </LoadingTable>

            <Link to='/cadastro-epi' className="button">Cadastrar</Link>
        </PageContent>
    );
};

export default PageEpi;
