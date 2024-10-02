import { Link } from 'react-router-dom';
import { useState } from 'react';
import useSWR from 'swr';
import { fetchMarcas } from "./api/apiMarca";
import LargeLoading from '../../componentes/LoadingAnimation/LargeLoading';
import TitleSearch from "../../componentes/PageComponents/PagePrincipalHeader";
import TableMarcas from './TableMarcas';
import Paginacao from '../../componentes/Paginacao';
import PageNotFound from '../PageNotFound';
import ModalLoading from "../../componentes/Modal/ModalLoading"
import PageContent from '../../componentes/PageComponents/PageContent';

// Definindo o fetcher para SWR usando o método fetchMarcas com paginação
const fetcher = (url, page, size) => fetchMarcas(page, size);

const PageMarcas = () => {
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [tamanhoPagina] = useState(10);
  const [searchTerm, setSearchTerm] = useState(''); // Hook para o filtro de pesquisa

  // Usando SWR para buscar os epi
  const { data, error, isLoading } = useSWR(
    ['fetchMarcas', paginaAtual, tamanhoPagina],  // chave única para cache
    () => fetcher('fetchMarcas', paginaAtual, tamanhoPagina),  // fetcher function
    { revalidateOnFocus: false, revalidateOnReconnect: true }  // configurações SWR
  );

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

  const { lista: marcas, totalRegistros, totalPaginas } = data;

  const filter = marcas.filter((item) => {
    return (
      item.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handlePageChange = (newPage) => {
    setPaginaAtual(newPage);
  };

  return (
    <PageContent>
      <TitleSearch title="Marcas" onSearchChange={setSearchTerm} />
      {filter.length === 0 ? (
        <LargeLoading />
      ) : (
        <>
          <TableMarcas vetor={filter} />
          <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            totalRegistros={totalRegistros}
            onPageChange={handlePageChange}
          />
        </>
      )
      }
      <Link to='/cadastro-marcas' className="button">Cadastrar</Link>
    </PageContent>
  )
}

export default PageMarcas;
