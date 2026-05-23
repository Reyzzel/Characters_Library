import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5065'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})
api.interceptors.response.use(
  r => r,
  e => Promise.reject(new Error(e.response?.data?.message || e.message))
)

export const charactersApi = {
  getAll:  ()                       => api.get('/api/characters'),
  getById: (id: number)             => api.get(`/api/characters/${id}`),
  create:  (data: unknown)          => api.post('/api/characters', data),
  update:  (id: number, d: unknown) => api.put(`/api/characters/${id}`, d),
  delete:  (id: number)             => api.delete(`/api/characters/${id}`),
}
export const elementsApi = {
  getAll:  ()                       => api.get('/api/elements'),
  getById: (id: number)             => api.get(`/api/elements/${id}`),
  create:  (data: unknown)          => api.post('/api/elements', data),
  update:  (id: number, d: unknown) => api.put(`/api/elements/${id}`, d),
  delete:  (id: number)             => api.delete(`/api/elements/${id}`),
}
export const weaponTypesApi = {
  getAll:  ()                       => api.get('/api/weapontypes'),
  getById: (id: number)             => api.get(`/api/weapontypes/${id}`),
  create:  (data: unknown)          => api.post('/api/weapontypes', data),
  update:  (id: number, d: unknown) => api.put(`/api/weapontypes/${id}`, d),
  delete:  (id: number)             => api.delete(`/api/weapontypes/${id}`),
}
export const talentsApi = {
  getAll:  ()                       => api.get('/api/talents'),
  getById: (id: number)             => api.get(`/api/talents/${id}`),
  create:  (data: unknown)          => api.post('/api/talents', data),
  update:  (id: number, d: unknown) => api.put(`/api/talents/${id}`, d),
  delete:  (id: number)             => api.delete(`/api/talents/${id}`),
}
export default api
