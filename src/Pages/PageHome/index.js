import { Link } from "react-router-dom";
import { useState } from "react";
import useSWR from 'swr';
import { fetchEpiUsuario } from "./api";
import TitleSearch from "../../componentes/PageComponents/PagePrincipalHeader";
import TableEpiUsuario from "./TableEpiUsuario";
import PageNotFound from "../PageNotFound";
import ModalLoading from "../../componentes/Modal/ModalLoading";
import PageContent from "../../componentes/PageComponents/PageContent";
import LoadingTable from "../../componentes/PageComponents/PagePrincipalLoadingTables";

// Definindo o fetcher para SWR usando o método fetchEpiUsuario
const fetcher = () => fetchEpiUsuario(0, 9999);

const PageHome = () => {
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [tamanhoPagina] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');  // Hook para o filtro de pesquisa

    // Usando SWR para buscar todos os epi
    const { data, error, isLoading } = useSWR('fetchEpiUsuario', fetcher, {
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

    const { lista: epiUsuario } = data;

    // Função para filtrar os dados em todos os registros carregados
    const filter = epiUsuario.filter((item) => {
        return (
            (item.idEpi.nome ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.idEpi.patrimonio ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.idEpi.local ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.idUsuario.nome ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.idUsuario.telContato ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.idUsuario.email ?? '').toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    // Controle de paginação - fatiando os itens de acordo com a página atual
    const inicio = paginaAtual * tamanhoPagina;
    const fim = inicio + tamanhoPagina;
    const itensPaginados = filter.slice(inicio, fim);

    const handlePageChange = (newPage) => {
        setPaginaAtual(newPage);
    };

    return (
        <PageContent>
            <TitleSearch title="Home" onSearchChange={setSearchTerm} />

            <LoadingTable
                isLoading={isLoading}
                mensagemRetorno={"Nenhum usuário vinculado ao equipamento foi encontrado!"}
                paginaAtual={paginaAtual}
                totalPaginas={Math.ceil(filter.length / tamanhoPagina)}  // Calcula as páginas com base no filtro
                totalRegistros={filter.length}
                handlePageChange={handlePageChange}
                filter={itensPaginados}  // Usando os itens paginados
            >
                <TableEpiUsuario vetor={itensPaginados} />
            </LoadingTable>

            <Link to='/cadastro-epi' className="button">Cadastrar</Link>
        </PageContent>
    );
};

export default PageHome;
