import { Author } from '../contexts/AuthorContext';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const AuthorService = {
  async getAllAuthors(): Promise<Author[]> {
    const response = await axios.get(`${API_BASE_URL}/authors`);
    return response.data;
  },

  async getAuthorById(id: number): Promise<Author> {
    const response = await axios.get(`${API_BASE_URL}/authors/${id}`);
    return response.data;
  },

  async createAuthor(author: Omit<Author, 'id'>): Promise<Author> {
    const response = await axios.post(`${API_BASE_URL}/authors`, author);
    return response.data;
  },

  async updateAuthor(id: number, author: Partial<Author>): Promise<Author> {
    const response = await axios.put(`${API_BASE_URL}/authors/${id}`, author);
    return response.data;
  },

  async deleteAuthor(id: number): Promise<void> {
    await axios.delete(`${API_BASE_URL}/authors/${id}`);
  },
};
