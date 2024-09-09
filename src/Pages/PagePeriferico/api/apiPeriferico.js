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

// Lista Apenas um elemento com base no ID
export const fetchPerifericoById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/periferico/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar Epi:', error);
        throw error;
    }
};

export const fetchPerifericos = async (page = 0, size = 10) => {
    try {
        const response = await axios.get(`${API_URL}/periferico?p=${page}&s=${size}`);
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
export const cadastrarPerifericos = async (periferico) => {
    try {
        const response = await axios.post(`${API_URL}/periferico`, periferico, {
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

// Vincular EPI com Periférico
export const vincularEpiPeriferico = async (idEpi, idPeriferico) => {
    try {
        const payload = {
            idEpi: { id: idEpi },
            idPeriferico: { id: idPeriferico }
        };

        const response = await axios.post(`${API_URL}/epi-periferico`, payload, {
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
export const alterarPeriferico = async (id, periferico) => {
    try {
        const response = await axios.put(`${API_URL}/periferico/${id}`, periferico, {
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
export const excluirPeriferico = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/periferico/${id}`);
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
