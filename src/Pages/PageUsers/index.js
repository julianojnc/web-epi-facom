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
const fetcher = (url, page, size) => fetchUsers(page, size);

const PageUsers = () => {
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [tamanhoPagina] = useState(10);
  const [searchTerm, setSearchTerm] = useState(''); // Hook para o filtro de pesquisa

  // Usando SWR para buscar os epi
  const { data, error, isLoading } = useSWR(
    ['fetchUsers', paginaAtual, tamanhoPagina],  // chave única para cache
    () => fetcher('fetchUsers', paginaAtual, tamanhoPagina),  // fetcher function
    { revalidateOnFocus: false, revalidateOnReconnect: true }  // configurações SWR
  );

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

  const { lista: users, totalRegistros, totalPaginas } = data;

  // Filtro de pesquisa
  const filter = users.filter((item) => {
    return (
      (item.nome ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.telContato ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.email ?? '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handlePageChange = (newPage) => {
    setPaginaAtual(newPage);
  };

  return (
    <PageContent>
      <TitleSearch title="Usuários" onSearchChange={setSearchTerm} />

      <LoadingTable
        isLoading={isLoading}
        pageName={"usuários"}
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        totalRegistros={totalRegistros}
        handlePageChange={handlePageChange}
        filter={filter}
      >
        <TableUsers vetor={filter} />
      </LoadingTable>

      <Link to='/cadastro-usuarios' className="button">Cadastrar</Link>
    </PageContent>
  )
}

export default PageUsers;