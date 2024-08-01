import { Link } from "react-router-dom";
import MenuBar from "../../componentes/MenuBar";
import iconSearch from "../../assets/icon-search.png";
import TableUsers from "./TableUsers";
import { useEffect, useState } from "react";
import { fetchUsers } from "./api/apiUser";
import LargeLoading from "../../componentes/LoadingAnimation/LargeLoading";

const PageUsers = () => {

  //Hook 
  const [users, setUsers] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchAndSetUser = async () => {
      const fetchedUser = await fetchUsers();
      setUsers(fetchedUser);
    };
    fetchAndSetUser();
  }, []);

  useEffect(() => {
    setCarregando(users.length === 0);
  }, [users]);

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
          <TableUsers vetor={users} />
        )
        }

        <Link to='/cadastro-usuarios' className="button">Cadastrar</Link>
      </div>
    </section>
  )
}

export default PageUsers;