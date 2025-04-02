import { Book } from '../contexts/BookContext';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const BookService = {
  async getAllBooks(): Promise<Book[]> {
    const response = await axios.get(`${API_BASE_URL}/books`);
    return response.data;
  },

  async getBookById(id: number): Promise<Book> {
    const response = await axios.get(`${API_BASE_URL}/books/${id}`);
    return response.data;
  },

  async createBook(author: Omit<Book, 'id'>): Promise<Book> {
    const response = await axios.post(`${API_BASE_URL}/books`, author);
    return response.data;
  },

  async updateBook(id: number, author: Partial<Book>): Promise<Book> {
    const response = await axios.put(`${API_BASE_URL}/books/${id}`, author);
    return response.data;
  },

  async deleteBook(id: number): Promise<void> {
    await axios.delete(`${API_BASE_URL}/books/${id}`);
  },
};
