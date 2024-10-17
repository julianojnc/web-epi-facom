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
export const fetchMarcaById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/marca/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar Epi:', error);
        throw error;
    }
};

//Fecth para a listagem na Table
export const fetchMarcas = async (page = 0, size = 10) => {
    try {
        const response = await axios.get(`${API_URL}/marca?p=${page}&s=${size}`);
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

//Fetch para a Listagem dentro de Cadastro Epi e Periferico
export const fetchMarca = async () => {
    try {
        const response = await axios.get(`${API_URL}/marca`);
        if (Array.isArray(response.data.lista)) {
            return response.data.lista;
        } else {
            console.error('A resposta da API não contém a estrutura esperada:', response.data.lista);
            return [];
        }
    } catch (error) {
        handleApiError(error);
        return [];
    }
};

export const cadastrarMarcas = async (marca) => {
    try {
        const response = await axios.post(`${API_URL}/marca`, marca, {
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
export const alterarMarca = async (id, marca) => {
    try {
        const response = await axios.put(`${API_URL}/marca/${id}`, marca, {
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
export const excluirMarca = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/marca/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

const handleApiError = (error) => {
    if (error.response) {
        console.error('Erro na resposta da API:', error.response);
    } else if (error.request) {
        console.error('Erro na requisição:', error.request);
    } else {
        console.error('Erro ao configurar a requisição:', error.message);
    }
};
