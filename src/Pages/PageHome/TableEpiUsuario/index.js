const TableEpiUsuario = ({ vetor }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>PATRIMONIO</th>
                    <th>LOCAL</th>
                    <th>USUARIO</th>
                    <th>CONTATO</th>
                    <th>EMAIL</th>
                </tr>
            </thead>
            <tbody>
                {vetor.map(obj => (
                    <tr key={obj.id}>
                        <td>{obj.idEpi.id}</td>
                        <td>{obj.idEpi.nome}</td>
                        <td>{obj.idEpi.patrimonio}</td>
                        <td>{obj.idEpi.local}</td>
                        <td>{obj.idUsuario.nome}</td>
                        <td>{obj.idUsuario.telContato}</td>
                        <td>{obj.idUsuario.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableEpiUsuario;
