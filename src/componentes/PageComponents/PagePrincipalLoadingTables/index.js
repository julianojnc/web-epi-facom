import Paginacao from "../../Paginacao";
import LargeLoading from "../../LoadingAnimation/LargeLoading";

const LoadingTable = ({ children, isLoading, filter, pageName, paginaAtual, totalPaginas, totalRegistros, handlePageChange }) => {
    return (
        <>
            {
                isLoading ? (
                    <LargeLoading />
                ) : (
                    filter.length === 0 ? (
                        <div>
                            <p>Não há {pageName} cadastrados!</p>
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