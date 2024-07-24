import './MenuBar.css'
import iconLogo from "../../assets/icon-logo.png"
import iconEpi from "../../assets/icon-equipamento.png"
import iconUser from "../../assets/icon-user.png"
import iconMarca from "../../assets/icon-marca.png"
import { Link } from 'react-router-dom'
import MenuLink from './MenuLink'

const MenuBar = () => {
    return (
        <nav>
            <ul>

                <Link to="/" title='Voltar para a HomePage'>
                    <li className='icon icon-logo'>
                        <span>
                            <img src={iconLogo} alt="icon"></img>
                        </span>
                    </li>
                </Link>

                <MenuLink to='/'>
                        <span>
                            <img src={iconEpi} alt="icon"></img>
                        </span>
                </MenuLink>

                <MenuLink to="/usuarios" title='Usuários'>
                        <span>
                            <img src={iconUser} alt="icon"></img>
                        </span>
                </MenuLink>

                <MenuLink to="/marcas" title='Marcas'>
                        <span>
                            <img src={iconMarca} alt="icon"></img>
                        </span>
                </MenuLink>

            </ul>
        </nav>
    )
}

export default MenuBar;
