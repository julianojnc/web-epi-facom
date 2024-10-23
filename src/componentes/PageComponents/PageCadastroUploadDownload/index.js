import { Link } from "react-router-dom";

const SERVER_FILE = process.env.REACT_APP_FILE_SERVER_KEY;

const UploadDowload = ({ handleFileUpload, handleFileDownload, obj, setSelectedFile, folder }) => {

    const handleNfeClick = () => {
        window.open(`${SERVER_FILE}${folder}/${obj.fileName}`, "_blank");
    };

    return (
        <>
            {/* Botão de download do arquivo, caso exista */}
            {obj.fileName ? (
                <div className="container-buttons">
                    <label className="label"> Arquivo Nfe:
                        <input
                            className="input input-marca"
                            value={obj.fileName}
                            onClick={handleNfeClick}
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