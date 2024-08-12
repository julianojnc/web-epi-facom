import { Link } from "react-router-dom";

const Buttons = ({id, cadastrar}) => {
    return(
        <div className="container-buttons">
                        {id ? (
                            <>
                                <Link to='/cadastro-perifericos' className="button button-cadastrar alterar">Alterar</Link>
                                <Link to='/cadastro-perifericos' className="button button-cadastrar excluir">Excluir</Link>
                            </>
                        ) : (
                            <Link onClick={cadastrar} className="button button-cadastrar">Cadastrar</Link>
                        )}
                    </div>
    )
}

export default Buttons;