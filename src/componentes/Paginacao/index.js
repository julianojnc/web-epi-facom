import { MdFirstPage, MdLastPage, MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { Link } from "react-router-dom";
import "../../styles/Paginacao.css";

/*
    Paginação, compoente referente a pagina mostrada na Table que lista marca, usuario, epi, perifeiro
    e Home. Em cada pagina é passada a prop referente ao valor da paginaAtual, totalPaaginas, totalRegistro
    e onPageChange essa ultima responsável pela função de clicar na opção 3 e ir para a pagina 3.
*/
const Paginacao = ({ paginaAtual, totalPaginas, totalRegistros, onPageChange }) => {

    const handleFirstPage = () => {
        onPageChange(0);
    };

    const handlePreviousPage = () => {
        if (paginaAtual > 0) {
            onPageChange(paginaAtual - 1);
        }
    };

    const handleNextPage = () => {
        if (paginaAtual < totalPaginas - 1) {
            onPageChange(paginaAtual + 1);
        }
    };

    const handleLastPage = () => {
        onPageChange(totalPaginas - 1);
    };

    const handlePageClick = (pageNumber) => {
        onPageChange(pageNumber);
    };

    const renderPaginationButtons = () => {
        const pageButtons = [];
        const maxButtons = 3;
        const startPage = Math.max(0, Math.min(paginaAtual - Math.floor(maxButtons / 2), totalPaginas - maxButtons));
        const endPage = Math.min(totalPaginas, startPage + maxButtons);

        for (let i = startPage; i < endPage; i++) {
            pageButtons.push(
                <Link
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`pagination-button ${paginaAtual === i ? 'active' : ''}`}
                >
                    {i + 1}
                </Link>
            );
        }
        return pageButtons;
    };

    return (
        <div className="paginacao">
            <div>
                <p>Página {paginaAtual + 1} de {totalPaginas}</p>
            </div>

            <div>
                <p>Quantidade de Registros: {totalRegistros}</p>
                <Link
                    title="Primeira Página"
                    onClick={handleFirstPage}
                    className={`pagination-icon ${paginaAtual === 0 ? 'disabled' : ''}`}
                >
                    <MdFirstPage />
                </Link>
                <Link
                    title="Página Anterior"
                    onClick={handlePreviousPage}
                    className={`pagination-icon ${paginaAtual === 0 ? 'disabled' : ''}`}
                >
                    <MdNavigateBefore />
                </Link>
                {renderPaginationButtons()}
                <Link
                    title="Próxima Página"
                    onClick={handleNextPage}
                    className={`pagination-icon ${paginaAtual >= totalPaginas - 1 ? 'disabled' : ''}`}
                >
                    <MdNavigateNext />
                </Link>
                <Link
                    title="Última Página"
                    onClick={handleLastPage}
                    className={`pagination-icon ${paginaAtual >= totalPaginas - 1 ? 'disabled' : ''}`}
                >
                    <MdLastPage />
                </Link>
            </div>
        </div>
    );
}

export default Paginacao;
