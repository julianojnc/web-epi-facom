import { Link } from "react-router-dom";
import PageContent from "../../componentes/PageComponents/PageContent";
import imgSemConexao from "../../assets/img-sem-conexao.png"

const PageNotFound = () => {
    return (
        <PageContent>
            <main className="page-not-found">
                <div>
                    <h1>Erro 404! <br></br>Pagina não encontrada!</h1>
                    <Link to="/" className="button button-cadastrar">Voltar</Link>
                </div>
                <span>
                    <img src={imgSemConexao} alt="img" />
                </span>
            </main>
        </PageContent>
    )
}

export default PageNotFound;