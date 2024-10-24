import axios from 'axios';
import axiosRetry from 'axios-retry';

const API_URL = process.env.REACT_APP_API_KEY;

// Configuração do retry
axiosRetry(axios, {
    retries: 3,  // Número de tentativas
    retryDelay: (retryCount) => {
        console.log(`Tentativa de requisição: ${retryCount}`);
        return retryCount * 1000;  // Atraso entre as tentativas (1 segundo por tentativa)
    },
    retryCondition: (error) => {
        // Retry apenas se houver erro de rede ou erro 5xx
        return error.response.status >= 500 || error.code === 'ECONNABORTED';
    },
});

// Lista Apenas um elemento com base no ID
export const fetchEpiById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/epi/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar Epi:', error);
        throw error;
    }
};

// Listar todos os elementos e tambem a pagina do mesmo e quantos por pagina
export const fetchEpi = async (page = 0, size = 10) => {
    try {
        const response = await axios.get(`${API_URL}/epi?p=${page}&s=${size}`);
        if (response.data && Array.isArray(response.data.lista)) {
            return {
                lista: response.data.lista,
                totalRegistros: response.data.totalRegistros,
                totalPaginas: response.data.totalPaginas
            };
        } else {
            console.error('A resposta da API não contém a estrutura esperada:', response.data);
            return { lista: [], totalRegistros: 0, totalPaginas: 0 };
        }
    } catch (error) {
        handleApiError(error);
        return { lista: [], totalRegistros: 0, totalPaginas: 0 };
    }
};

// cadastrar
export const cadastrarEpi = async (epi) => {
    try {
        const response = await axios.post(`${API_URL}/epi`, epi, {
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Alterar
export const alterarEpi = async (id, epi) => {
    try {
        const response = await axios.put(`${API_URL}/epi/${id}`, epi, {
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Excluir
export const excluirEpi = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/epi/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para upload de arquivo
export const uploadFileEpi = async (id, formData) => {
    try {
        const response = await axios.post(`${API_URL}/epi/${id}/uploadFile`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao fazer upload de arquivo:', error);
        throw error;
    }
};

// Função para download de arquivo
export const downloadFileEpi = async (id, name) => {
    try {
        const response = await axios.get(`${API_URL}/epi/${id}/downloadFile`, {
            responseType: 'blob',
        });
        // Cria um link temporário para o download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${name}`); // Nome do arquivo
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error('Erro ao fazer download de arquivo:', error);
        throw error;
    }
};

// tratativa de erros
const handleApiError = (error) => {
    if (error.response) {
        console.error('Erro na resposta da API:', error.response);
    } else if (error.request) {
        console.error('Erro na requisição:', error.request);
    } else {
        console.error('Erro ao configurar a requisição:', error.message);
    }
};
