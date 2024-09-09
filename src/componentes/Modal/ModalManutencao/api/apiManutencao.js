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
