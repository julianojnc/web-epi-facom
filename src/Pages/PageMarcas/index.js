import { Link } from 'react-router-dom';
import MenuBar from '../../componentes/MenuBar'
import iconSearch from "../../assets/icon-search.png"
import TableMarcas from './TableMarcas';
import { useEffect, useState } from 'react';
import { fetchMarcas } from "./api/apiMarca";
import LargeLoading from '../../componentes/LoadingAnimation/LargeLoading';
import Paginacao from '../../componentes/Paginacao';

const PageMarcas = () => {

  //Hook 
  const [marcas, setMarcas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [tamanhoPagina] = useState(10);

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

  const handlePageChange = (newPage) => {
    setPaginaAtual(newPage);
  };

  return (
    <section>
      <MenuBar />
      <div className="content-page-epi">

        <div className="title">
          <h1>MARCAS</h1>

          <span>
            <input className="input" placeholder="Pesquisar..." />
            <span className="search-icon">
              <img src={iconSearch} alt="icon"></img>
            </span>
          </span>
        </div>

        {carregando ? (
          <LargeLoading />
        ) : (
          <>
            <TableMarcas vetor={marcas} />
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