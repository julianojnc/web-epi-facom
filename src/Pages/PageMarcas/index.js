import { Link } from 'react-router-dom';
import MenuBar from '../../componentes/MenuBar'
import iconSearch from "../../assets/icon-search.png"
import TableMarcas from './TableMarcas';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PageMarcas = () => {

    //Hook 
    const [marcas, setMarcas] = useState([]);
    const [carregandoMarcas, setCarregandoMarcas] = useState(true);

    useEffect(() => {
        const fetchMarcas = async () => {
          try {
            const response = await axios.get('http://localhost:4000/api/marca');
            if (Array.isArray(response.data.lista)) {
                setMarcas(response.data.lista);
            } else {
              console.error('A resposta da API não contém a estrutura esperada:', response.data.lista);
            }
          } catch (error) {
            if (error.response) {
              // A requisição foi feita e o servidor respondeu com um status code fora do alcance 2xx
              console.error('Erro na resposta da API:', error.response);
            } else if (error.request) {
              // A requisição foi feita mas nenhuma resposta foi recebida
              console.error('Erro na requisição:', error.request);
            } else {
              // Algo aconteceu ao configurar a requisição que disparou um erro
              console.error('Erro ao configurar a requisição:', error.message);
            }
          }
        };
        fetchMarcas();
      }, []);
    
      useEffect(() => {
        if (marcas.length === 0) {
            setCarregandoMarcas(true);
        } else {
            setCarregandoMarcas(false);
        }
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

                <TableMarcas vetor={marcas}/>

                <Link to='/cadastro-marcas' className="button">Cadastrar</Link>
            </div>
        </section>
    )
}

export default PageMarcas;