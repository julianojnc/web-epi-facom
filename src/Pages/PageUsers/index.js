import { Link } from "react-router-dom";
import MenuBar from "../../componentes/MenuBar";
import iconSearch from "../../assets/icon-search.png";
import TableUsers from "./TableUsers";
import { useEffect, useState } from "react";
import { fetchUsers } from "./api/apiUser";
import LargeLoading from "../../componentes/LoadingAnimation/LargeLoading";
import Paginacao from "../../componentes/Paginacao";

const PageUsers = () => {

  //Hook 
  const [users, setUsers] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [tamanhoPagina] = useState(10);

  useEffect(() => {
    const fetchAndSetUser = async () => {
      setCarregando(true);
      const { lista, totalRegistros, totalPaginas } = await fetchUsers(paginaAtual, tamanhoPagina);
      setUsers(lista);
      setTotalRegistros(totalRegistros);
      setTotalPaginas(totalPaginas);
      setCarregando(false);
    };
    fetchAndSetUser();
  }, [paginaAtual, tamanhoPagina]);

  const handlePageChange = (newPage) => {
    setPaginaAtual(newPage);
  };

  return (
    <section>
      <MenuBar />
      <div className="content-page-epi">

        <div className="title">
          <h1>USUÁRIOS</h1>

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
            <TableUsers vetor={users} />
            <Paginacao
              paginaAtual={paginaAtual}
              totalPaginas={totalPaginas}
              totalRegistros={totalRegistros}
              onPageChange={handlePageChange}
            />
          </>
        )
        }

        <Link to='/cadastro-usuarios' className="button">Cadastrar</Link>
      </div>
    </section>
  )
}

export default PageUsers;