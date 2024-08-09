import { Link } from "react-router-dom";
import MenuBar from "../../componentes/MenuBar";
import TableUsers from "./TableUsers";
import { useEffect, useState } from "react";
import { fetchUsers } from "./api/apiUser";
import LargeLoading from "../../componentes/LoadingAnimation/LargeLoading";
import Paginacao from "../../componentes/Paginacao";
import TitleSearch from "../../componentes/PageComponents";

const PageUsers = () => {

  //Hook 
  const [users, setUsers] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [tamanhoPagina] = useState(10);
  const [searchTerm, setSearchTerm] = useState(''); // Hook para o filtro de pesquisa

  useEffect(() => {
    const fetchAndSetUser = async () => {
      if (users.length === 0) {
        setCarregando(true);
      }
      const { lista, totalRegistros, totalPaginas } = await fetchUsers(paginaAtual, tamanhoPagina);
      setUsers(lista);
      setTotalRegistros(totalRegistros);
      setTotalPaginas(totalPaginas);
      setCarregando(false);
    };
    fetchAndSetUser();
  }, [paginaAtual, tamanhoPagina]);

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
    <section>
      <MenuBar />
      <div className="content-page">

        <TitleSearch title="Usuários" onSearchChange={setSearchTerm} />

        {carregando ? (
          <LargeLoading />
        ) : (
          <>
            <TableUsers vetor={filter} />
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