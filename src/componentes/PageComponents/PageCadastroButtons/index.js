import { Link } from "react-router-dom";

const Buttons = ({id, cadastrarOuAlterar, excluir}) => {
    return(
        <div className="container-buttons">
                        {id ? (
                            <>
                                <Link onClick={cadastrarOuAlterar} className="button button-cadastrar alterar">Alterar</Link>
                                <Link onClick={excluir} className="button button-cadastrar excluir">Excluir</Link>
                                
                            </>
                        ) : (
                            <Link onClick={cadastrarOuAlterar} className="button button-cadastrar">Cadastrar</Link>
                        )}
                    </div>
    )
}

export default Buttons;