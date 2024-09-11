import axios from 'axios';
import axiosRetry from 'axios-retry';

const API_URL = 'http://localhost:4000/api';

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

// Listar todos os elementos e tambem a pagina do mesmo e quantos por pagina
export const fetchManutencao = async (page = 0, size = 8) => {
    try {
        const response = await axios.get(`${API_URL}/manutencao?p=${page}&s=${size}`);
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

// cadastrar Manutencao
export const cadastrarManutencao = async (manutencao) => {
    try {
        const response = await axios.post(`${API_URL}/manutencao`, manutencao, {
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
