import "../MenuBar.css"
import { Link, useLocation } from "react-router-dom"

const MenuLink = ({ children, to, title }) => {

    // Destaca icone no menu quando selecionada a pagina do mesmo
    const localizacao = useLocation();

    return (
        <Link to={to} title={title}>
            <li className={`icon icon-menu ${localizacao.pathname === to ? 'linkDestacado' : ''}`}>{children}</li>
        </Link>
    )
}

export default MenuLink