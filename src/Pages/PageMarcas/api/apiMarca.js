import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

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

const handleApiError = (error) => {
    if (error.response) {
        console.error('Erro na resposta da API:', error.response);
    } else if (error.request) {
        console.error('Erro na requisição:', error.request);
    } else {
        console.error('Erro ao configurar a requisição:', error.message);
    }
};
