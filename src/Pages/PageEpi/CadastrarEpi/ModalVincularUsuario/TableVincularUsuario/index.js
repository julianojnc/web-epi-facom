const TableVincularUsuario = ({ vetor }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>CONTATO</th>
                    <th>EMAIL</th>
                    <th>VINCULADO</th>
                </tr>
            </thead>

            <tbody>
            {vetor.map((obj) => (
                    <tr key={obj.id}>
                        <td>{obj.id}</td>
                        <td>{obj.idUsuario.nome}</td>
                        <td>{obj.idUsuario.telContato}</td>
                        <td>{obj.idUsuario.email}</td>
                        <td>{obj.idUsuario.isVinculado}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableVincularUsuario;
