import { Link } from "react-router-dom";
import { useState } from "react";
import useSWR from 'swr';
import { fetchEpiUsuario } from "./api";
import TitleSearch from "../../componentes/PageComponents/PagePrincipalHeader";
import TableEpiUsuario from "./TableEpiUsuario";
import PageNotFound from "../PageNotFound";
import ModalLoading from "../../componentes/Modal/ModalLoading"
import PageContent from "../../componentes/PageComponents/PageContent";
import LoadingTable from "../../componentes/PageComponents/PagePrincipalLoadingTables";

// Definindo o fetcher para SWR usando o método fetchEpiUsuario com paginação
const fetcher = (url, page, size) => fetchEpiUsuario(page, size);

const PageHome = () => {
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [tamanhoPagina] = useState(10);
    const [searchTerm, setSearchTerm] = useState(''); // Hook para o filtro de pesquisa

    // Usando SWR para buscar os epi
    const { data, error, isLoading } = useSWR(
        ['fetchEpiUsuario', paginaAtual, tamanhoPagina],  // chave única para cache
        () => fetcher('fetchEpiUsuario', paginaAtual, tamanhoPagina),  // fetcher function
        { revalidateOnFocus: false, revalidateOnReconnect: true }  // configurações SWR
    );

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

    const { lista: epiUsuario, totalRegistros, totalPaginas } = data;

    // Função para filtrar os dados
    const filter = epiUsuario.filter((item) => {
        return (
            item.idEpi.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.idEpi.patrimonio.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.idEpi.local.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.idUsuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.idUsuario.telContato.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.idUsuario.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const handlePageChange = (newPage) => {
        setPaginaAtual(newPage);
    };

    return (
        <PageContent>
            <TitleSearch title="Home" onSearchChange={setSearchTerm} />

            <LoadingTable
                isLoading={isLoading}
                pageName={"usuários vinculados a nenhum equipamento"}
                paginaAtual={paginaAtual}
                totalPaginas={totalPaginas}
                totalRegistros={totalRegistros}
                handlePageChange={handlePageChange}
                filter={filter}
            >
                <TableEpiUsuario vetor={filter} />
            </LoadingTable>

            <Link to='/cadastro-epi' className="button">Cadastrar</Link>
        </PageContent>
    );
};

export default PageHome;
