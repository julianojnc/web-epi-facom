import { Link } from "react-router-dom";

const ButtonsVincular = ({ cadastrar, alterar, vincular, loadingButtonProp, loadingButton, objVinculado, obj, idItem }) => {
    return(
        <div className="container-buttons">
                <div className="container-buttons">
                    {objVinculado.id > 0 ? (
                        (obj.id || idItem > 0) ? (
                            <Link onClick={loadingButton ? "" : alterar} className={loadingButton ? "button button-cadastrar disable" : "button button-cadastrar"}>
                                {loadingButton ? "Desvinculando..." : "Desvincular"}
                            </Link>
                        ) : null
                    ) : (
                        (obj.id || idItem > 0) ? (
                            <Link onClick={loadingButtonProp ? "" : vincular} className={loadingButtonProp ? "button button-cadastrar disable" : "button button-cadastrar"}>
                                {loadingButtonProp ? "Vinculando..." : "Vincular"}
                            </Link>
                        ) : (
                            <Link onClick={loadingButtonProp ? "" : cadastrar} className={loadingButtonProp ? "button button-cadastrar disable" : "button button-cadastrar"}>
                                {loadingButtonProp ? "Cadastrando..." : "Cadastrar Novo"}
                            </Link>
                        )
                    )}
                </div>
            </div>
    )
}

export default ButtonsVincular;