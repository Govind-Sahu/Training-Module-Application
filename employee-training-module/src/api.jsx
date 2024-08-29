import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getVideos = () => axios.get(`${API_URL}/videos`);
export const getUserProgress = (userId) => axios.get(`${API_URL}/progress/${userId}`);
export const updateUserProgress = (progressData) => axios.post(`${API_URL}/progress`, progressData);
