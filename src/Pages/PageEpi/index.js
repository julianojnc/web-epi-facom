import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEpi } from "./api/apiEpi";
import MenuBar from "../../componentes/MenuBar";
import LargeLoading from "../../componentes/LoadingAnimation/LargeLoading";
import TitleSearch from "../../componentes/PageComponents/PagePrincipalHeader";
import TableEpi from "./TableEpi";
import Paginacao from "../../componentes/Paginacao";

const PageEpi = () => {
    const [epi, setEpi] = useState([]); // Hook para armazenar obj info vinda da api
    const [carregando, setCarregando] = useState(true); // Hook para mostrar animação de Carregamento
    const [totalRegistros, setTotalRegistros] = useState(0); // Hook para armazenar o total de registros info vinda da api
    const [totalPaginas, setTotalPaginas] = useState(0); // Hook para armazenar o total de paginas info vinda da api
    const [paginaAtual, setPaginaAtual] = useState(0); // Hook para armazenar em qual pagina esta selecionada info vinda da api
    const [tamanhoPagina] = useState(10); // Hook para dizer quantos registro ira ser mostrado na tela
    const [searchTerm, setSearchTerm] = useState(''); // Hook para o filtro de pesquisa

    // Carregando Api
    useEffect(() => {
        const fetchAndSetEpi = async () => {
            setCarregando(true); // Ativa o carregamento antes da busca
            const { lista, totalRegistros, totalPaginas } = await fetchEpi(paginaAtual, tamanhoPagina);
            setEpi(lista);
            setTotalRegistros(totalRegistros);
            setTotalPaginas(totalPaginas);
            setCarregando(false); // Desativa o carregamento após a busca
        };
        fetchAndSetEpi();
    }, [paginaAtual, tamanhoPagina]);    

    // Filtro de pesquisa
    const filter = epi.filter((item) => {
        return (
            (item.nome ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.patrimonio ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.local ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.setor ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.serviceTag ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.expressCode ?? '').toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const handlePageChange = (newPage) => {
        setPaginaAtual(newPage);
    };

    return (
        <section>
            <MenuBar />
            <div className="content-page">

                <TitleSearch title="Equipamentos"  onSearchChange={setSearchTerm}/>

                {carregando || epi.length === 0 ? (
                    <LargeLoading />
                ) : (
                    <>
                        <TableEpi vetor={filter} />
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

export default PageEpi;
