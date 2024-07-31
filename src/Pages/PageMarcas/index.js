import { Link } from 'react-router-dom';
import MenuBar from '../../componentes/MenuBar'
import iconSearch from "../../assets/icon-search.png"
import TableMarcas from './TableMarcas';
import { useEffect, useState } from 'react';
import { fetchMarcas } from "./api/apiMarca";

const PageMarcas = () => {

  //Hook 
  const [marcas, setMarcas] = useState([]);
  const [carregandoMarcas, setCarregandoMarcas] = useState(true);

  useEffect(() => {
    const fetchAndSetMarcas = async () => {
      const fetchedMarcas = await fetchMarcas();
      setMarcas(fetchedMarcas);
    };
    fetchAndSetMarcas();
  }, []);

  useEffect(() => {
    setCarregandoMarcas(marcas.length === 0);
  }, [marcas]);

  return (
    <section>
      <MenuBar />
      <div className="content-page-epi">

        <div className="title">
          <h1>Marcas</h1>

          <span>
            <input className="input" placeholder="Pesquisar..." />
            <span className="search-icon">
              <img src={iconSearch} alt="icon"></img>
            </span>
          </span>
        </div>

        <TableMarcas vetor={marcas} />

        <Link to='/cadastro-marcas' className="button">Cadastrar</Link>
      </div>
    </section>
  )
}

export default PageMarcas;