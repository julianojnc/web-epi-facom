const TableUsers = ({ vetor }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>CONTATO</th>
                    <th>EMAIL</th>
                </tr>
            </thead>

            <tbody>
                {vetor.map(obj => (
                    <tr key={obj.id}>
                        <td>{obj.id}</td>
                        <td>{obj.nome}</td>
                        <td>{obj.telContato}</td>
                        <td>{obj.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableUsers;
