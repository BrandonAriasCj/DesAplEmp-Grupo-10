import axios from "axios";

const PREFIX_URL = 'http://127.0.0.1:8000/series/api/v1/categories/';

const serieService = {
    getAllSerie: async () => {
        const response = await axios.get(PREFIX_URL);
        return response;
    },

    createSerie: async (datos) => {
        const response = await axios.post(PREFIX_URL, datos);
        return response;
    },

    showSerie: async (id) => {
        const response = await axios.get(`${PREFIX_URL}${id}/`);
        return response;
    },

    deleteSerie: async (id) => {
        const response = await axios.delete(`${PREFIX_URL}${id}/`);
        return response;
    }
};

export default serieService;
