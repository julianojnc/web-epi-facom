import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const fetchPerifericos = async () => {
    try {
        const response = await axios.get(`${API_URL}/periferico`);
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

const handleApiError = (error) => {
    if (error.response) {
        console.error('Erro na resposta da API:', error.response);
    } else if (error.request) {
        console.error('Erro na requisição:', error.request);
    } else {
        console.error('Erro ao configurar a requisição:', error.message);
    }
};
