import Paginacao from "../../Paginacao";
import LargeLoading from "../../LoadingAnimation/LargeLoading";

const LoadingTable = ({ children, isLoading, filter, mensagemRetorno, paginaAtual, totalPaginas, totalRegistros, handlePageChange }) => {
    return (
        <>
            {
                isLoading ? (
                    <LargeLoading />
                ) : (
                    filter.length === 0 ? (
                        <div>
                            <p>{mensagemRetorno}</p>
                        </div>
                    ) : (
                        <>
                            {children}
                            <Paginacao
                                paginaAtual={paginaAtual}
                                totalPaginas={totalPaginas}
                                totalRegistros={totalRegistros}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )
                )
            }
        </>
    )
}

export default LoadingTable;