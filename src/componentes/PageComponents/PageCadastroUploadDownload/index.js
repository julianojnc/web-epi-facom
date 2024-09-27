import { Link } from "react-router-dom";

const UploadDowload = ({ handleFileUpload, handleFileDownload, obj, setSelectedFile }) => {
    return (
        <>
            {/* Botão de download do arquivo, caso exista */}
            {obj.fileName ? (
                <div className="container-buttons">
                    <label className="label"> Arquivo Nfe:
                        <input
                            className="input input-marca"
                            value={obj.fileName}
                        />
                    </label>
                    <Link className="button button-cadastrar download" type="button" onClick={handleFileDownload}>Baixar Nfe</Link>
                </div>
            ) : (
                <div className="container-buttons">
                    <label className="label">Anexar NFe:
                        <input
                            type="file"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                            className="input input-marca input-dowload"
                        />
                    </label>
                    <Link className="button button-cadastrar download" type="button" onClick={handleFileUpload}>Upload</Link>
                </div>
            )}
        </>
    )
}

export default UploadDowload;