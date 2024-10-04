import { useState } from "react";
import { Link } from "react-router-dom";

const Testes = () => {
    const [loadingButton, setLoadingButton] = useState(false);

    const clique = () => {
        setLoadingButton(true);
        console.log("Botao funcionando!")
        setTimeout(() => {
            setLoadingButton(false);
        }, 2000);
    }

    return (
        <>

            <Link
                onClick={loadingButton ? '' : clique}
                className={loadingButton ? 'button button-cadastrar disable' : "button button-cadastrar"}
            >
                {loadingButton ? "Desvinculando..." : "Desvincular"}
            </Link>

        </>
    )
}

export default Testes;