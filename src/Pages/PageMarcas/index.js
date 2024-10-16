import { Link } from 'react-router-dom';
import { useState } from 'react';
import useSWR from 'swr';
import { fetchMarcas } from "./api/apiMarca";
import TitleSearch from "../../componentes/PageComponents/PagePrincipalHeader";
import TableMarcas from './TableMarcas';
import PageNotFound from '../PageNotFound';
import ModalLoading from "../../componentes/Modal/ModalLoading"
import PageContent from '../../componentes/PageComponents/PageContent';
import LoadingTable from '../../componentes/PageComponents/PagePrincipalLoadingTables';

// Definindo o fetcher para SWR usando o método fetchMarcas com paginação
const fetcher = () => fetchMarcas(0, 9999);

const PageMarcas = () => {
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [tamanhoPagina] = useState(10);
  const [searchTerm, setSearchTerm] = useState(''); // Hook para o filtro de pesquisa

  // Usando SWR para buscar as marcas
  const { data, error, isLoading } = useSWR('fetchMarcas', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true
  });

  // Se ocorrer algum erro na requisição
  if (error) {
    console.error('Erro ao carregar Marcas:', error);
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

  const { lista: marcas } = data;

  const filter = marcas.filter((item) => {
    return (
      (item.nome ?? '').toLowerCase().includes(searchTerm.toLowerCase())
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
      <TitleSearch title="Marcas" onSearchChange={setSearchTerm} />

      <LoadingTable
        isLoading={isLoading}
        mensagemRetorno={"Nenhuma marca encontrada!"}
        paginaAtual={paginaAtual}
        totalPaginas={Math.ceil(filter.length / tamanhoPagina)}
        totalRegistros={filter.length}
        handlePageChange={handlePageChange}
        filter={itensPaginados}
      >
        <TableMarcas vetor={itensPaginados} />
      </LoadingTable>

      <Link to='/cadastro-marcas' className="button">Cadastrar</Link>
    </PageContent>
  )
}

export default PageMarcas;
