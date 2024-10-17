import { Link } from "react-router-dom";
import { useState } from "react";
import useSWR from 'swr';
import { fetchPerifericos } from ".//api/apiPeriferico";
import TitleSearch from "../../componentes/PageComponents/PagePrincipalHeader";
import TablePeriferico from "./TablePeriferico";
import PageNotFound from "../PageNotFound";
import ModalLoading from "../../componentes/Modal/ModalLoading"
import PageContent from "../../componentes/PageComponents/PageContent";
import LoadingTable from "../../componentes/PageComponents/PagePrincipalLoadingTables";

// Definindo o fetcher para SWR usando o método fetchPerifericos com paginação
const fetcher = () => fetchPerifericos(0, 9999);

const PagePeriferico = () => {
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [tamanhoPagina] = useState(10);
    const [searchTerm, setSearchTerm] = useState(''); // Hook para o filtro de pesquisa

    // Usando SWR para buscar os periféricos
    const { data, error, isLoading } = useSWR('fetchPerifericos', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });

    // Se ocorrer algum erro na requisição
    if (error) {
        console.error('Erro ao carregar periféricos:', error);
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

    const { lista: perifericos } = data;

    // Filtro de pesquisa
    const filter = perifericos.filter((item) => {
        return (
            (item.nome ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.patrimonio ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.serviceTag ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.expressCode ?? '').toLowerCase().includes(searchTerm.toLowerCase())
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
            <TitleSearch title="Periféricos" onSearchChange={setSearchTerm} />

            <LoadingTable
                isLoading={isLoading}
                mensagemRetorno={"Nenhum periférico encontrado!"}
                paginaAtual={paginaAtual}
                totalPaginas={Math.ceil(filter.length / tamanhoPagina)}
                totalRegistros={filter.length}
                handlePageChange={handlePageChange}
                filter={itensPaginados}
            >
                <TablePeriferico vetor={itensPaginados} />
            </LoadingTable>

            <Link to='/cadastro-perifericos' className="button">Cadastrar</Link>
        </PageContent>
    );
};

export default PagePeriferico;
