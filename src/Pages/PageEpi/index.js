import MenuBar from "../../componentes/MenuBar";
import TableEpi from "./TableEpi";
import iconSearch from "../../assets/icon-search.png"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PageEpi = () => {

    //Hook 
    const [epi, setEpi] = useState([]);
    const [carregandoEpi, setCarregandoEpi] = useState(true);

    useEffect(() => {
        const fetchEpi = async () => {
          try {
            const response = await axios.get('http://localhost:4000/api/epi');
            if (Array.isArray(response.data.lista)) {
                setEpi(response.data.lista);
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
        fetchEpi();
      }, []);
    
      useEffect(() => {
        if (epi.length === 0) {
            setCarregandoEpi(true);
        } else {
          setCarregandoEpi(false);
        }
      }, [epi]);


    return (
        <section>
            <MenuBar />
            <div className="content-page-epi">

                <div className="title">
                    <h1>Equipamentos</h1>

                    <span>
                        <input className="input" placeholder="Pesquisar..." />
                        <span className="search-icon">
                            <img src={iconSearch} alt="icon"></img>
                        </span>
                    </span>
                </div>

                <TableEpi vetor={epi} />

                <Link to='/cadastro-epi' className="button">Cadastrar</Link>
            </div>
        </section>
    )
}

export default PageEpi;