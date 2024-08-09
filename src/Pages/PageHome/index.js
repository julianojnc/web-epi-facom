import MenuBar from "../../componentes/MenuBar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LargeLoading from "../../componentes/LoadingAnimation/LargeLoading";
import Paginacao from "../../componentes/Paginacao";
import { fetchEpiUsuario } from "./api";
import TableEpiUsuario from "./TableEpiUsuario";
import TitleSearch from "../../componentes/PageComponents";

const PageHome = () => {
    const [epiUsuario, setEpiUsuario] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [tamanhoPagina] = useState(10);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de pesquisa

    useEffect(() => {
        const fetchAndSetEpiUsuario = async () => {
            if (epiUsuario.length === 0) {
                setCarregando(true);
            }
            const { lista, totalRegistros, totalPaginas } = await fetchEpiUsuario(paginaAtual, tamanhoPagina);
            setEpiUsuario(lista);
            setTotalRegistros(totalRegistros);
            setTotalPaginas(totalPaginas);
            setCarregando(false);
        };
        fetchAndSetEpiUsuario();
    }, [paginaAtual, tamanhoPagina]);

    // Função para filtrar os dados
    const filter = epiUsuario.filter((item) => {
        return (
            item.idEpi.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.idEpi.patrimonio.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.idEpi.local.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.idUsuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.idUsuario.telContato.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.idUsuario.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const handlePageChange = (newPage) => {
        setPaginaAtual(newPage);
    };

    return (
        <section>
            <MenuBar />
            <div className="content-page">
                <TitleSearch title="Home" onSearchChange={setSearchTerm} />
                {carregando ? (
                    <LargeLoading />
                ) : (
                    <>
                        <TableEpiUsuario vetor={filter} />
                        <Paginacao
                            paginaAtual={paginaAtual}
                            totalPaginas={totalPaginas}
                            totalRegistros={totalRegistros}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
                <Link to='/cadastro-epi' className="button">Cadastrar</Link>
            </div>
        </section>
    );
};

export default PageHome;
