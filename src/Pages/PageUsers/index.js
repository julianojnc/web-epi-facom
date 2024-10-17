import { Link } from "react-router-dom";
import { useState } from "react";
import useSWR from 'swr';
import { fetchUsers } from "./api/apiUser";
import TitleSearch from "../../componentes/PageComponents/PagePrincipalHeader";
import TableUsers from "./TableUsers";
import PageNotFound from "../PageNotFound";
import ModalLoading from "../../componentes/Modal/ModalLoading"
import PageContent from "../../componentes/PageComponents/PageContent";
import LoadingTable from "../../componentes/PageComponents/PagePrincipalLoadingTables";

// Definindo o fetcher para SWR usando o método fetchUsers com paginação
const fetcher = () => fetchUsers(0, 9999);

const PageUsers = () => {
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [tamanhoPagina] = useState(10);
  const [searchTerm, setSearchTerm] = useState(''); // Hook para o filtro de pesquisa

  // Usando SWR para buscar os epi
  const { data, error, isLoading } = useSWR('fetchUsers', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true
  });

  // Se ocorrer algum erro na requisição
  if (error) {
    console.error('Erro ao carregar Usuarios:', error);
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

  const { lista: users } = data;

  // Filtro de pesquisa
  const filter = users.filter((item) => {
    return (
      item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.telContato.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
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
      <TitleSearch title="Usuários" onSearchChange={setSearchTerm} />

      <LoadingTable
        isLoading={isLoading}
        mensagemRetorno={"Nenhum usuário encontrado!"}
        paginaAtual={paginaAtual}
        totalPaginas={Math.ceil(filter.length / tamanhoPagina)}
        totalRegistros={filter.length}
        handlePageChange={handlePageChange}
        filter={itensPaginados}
      >
        <TableUsers vetor={itensPaginados} />
      </LoadingTable>

      <Link to='/cadastro-usuarios' className="button">Cadastrar</Link>
    </PageContent>
  )
}

export default PageUsers;