import { useState } from "react";

const InputSearch = ({ obj, objVinculado, pesquisa, placeholder, filtroItem, icon, setObj, functionPesquisa }) => {
    const [showDropdown, setShowDropdown] = useState(false); // DropDown pesquisa

    return (
        <>
            {obj || objVinculado > 0 ? (
                <></>
            ) : (
                <label className="label"> Pesquisar Usuários:
                    <input
                        className="input"
                        type="text"
                        placeholder={placeholder}
                        value={pesquisa}
                        onChange={functionPesquisa}
                        onFocus={() => setShowDropdown(true)}
                    />
                </label>
            )}

            {showDropdown && (
                <ul className="dropdown">
                    {filtroItem.map((item) => (
                        <li key={item.id} onClick={() => {
                            setObj(item);
                            setShowDropdown(false); // Fechar o dropdown ao selecionar
                        }}>
                            <span>
                                <img src={icon} alt="icon"></img>
                            </span> {item.nome}
                        </li>
                    ))}
                </ul>
            )
            }
        </>
    )
}

export default InputSearch;