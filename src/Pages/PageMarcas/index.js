import { Link } from 'react-router-dom';
import MenuBar from '../../componentes/MenuBar'
import TableMarcas from './TableMarcas';
import { useEffect, useState } from 'react';
import { fetchMarcas } from "./api/apiMarca";
import LargeLoading from '../../componentes/LoadingAnimation/LargeLoading';
import Paginacao from '../../componentes/Paginacao';
import TitleSearch from '../../componentes/PageComponents';

const PageMarcas = () => {

  //Hook 
  const [marcas, setMarcas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [tamanhoPagina] = useState(10);
  const [searchTerm, setSearchTerm] = useState(''); // Hook para o filtro de pesquisa

  useEffect(() => {
    const fetchAndSetMarcas = async () => {
      if (marcas.length === 0) {
        setCarregando(true);
      }
      const { lista, totalRegistros, totalPaginas } = await fetchMarcas(paginaAtual, tamanhoPagina);
      setMarcas(lista);
      setTotalRegistros(totalRegistros);
      setTotalPaginas(totalPaginas);
      setCarregando(false);
    };
    fetchAndSetMarcas();
  }, [paginaAtual, tamanhoPagina]);

  const filter = marcas.filter((item) => {
    return (
      item.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handlePageChange = (newPage) => {
    setPaginaAtual(newPage);
  };

  return (
    <section>
      <MenuBar />
      <div className="content-page-epi">

        <TitleSearch title="Marcas" onSearchChange={setSearchTerm}/>

        {carregando ? (
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
      </div>
    </section>
  )
}

export default PageMarcas;