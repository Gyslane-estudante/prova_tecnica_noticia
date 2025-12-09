import axios from "axios";

const api = axios.create({
  baseURL: "https://improved-cod-wxqj59wj46j394r6-4001.app.github.dev"
});

export const listNoticias = () => api.get("/noticias");
export const createNoticia = (data: any) => api.post("/noticias", data);
export const updateNoticia = (id: number, data: any) => api.put(`/noticias/${id}`, data);
export const deleteNoticia = (id: number) => api.delete(`/noticias/${id}`);
