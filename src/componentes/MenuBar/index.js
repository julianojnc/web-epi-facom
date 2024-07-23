import './MenuBar.css'
import iconLogo from "../../assets/icon-logo.png"
import iconEpi from "../../assets/icon-equipamento.png"
import iconUser from "../../assets/icon-user.png"
import iconMarca from "../../assets/icon-marca.png"
import { Link } from 'react-router-dom'

const MenuBar = () => {
    return (
        <nav>
            <ul>
                <Link to="/">
                    <li className='icon icon-logo'>
                        <span>
                            <img src={iconLogo} alt="icon"></img>
                        </span>
                    </li>
                </Link>

                <Link to="/">
                    <li className='icon icon-menu'>
                        <span>
                            <img src={iconEpi} alt="icon"></img>
                        </span>
                    </li>
                </Link>

                <Link to="/usuarios">
                    <li className='icon icon-menu'>
                        <span>
                            <img src={iconUser} alt="icon"></img>
                        </span>
                    </li>
                </Link>

                <Link to="marcas icon-menu">
                    <li className='icon'>
                        <span>
                            <img src={iconMarca} alt="icon"></img>
                        </span>
                    </li>
                </Link>

            </ul>
        </nav>
    )
}

export default MenuBar;
