import { ICategory } from '../contexts/CategoryContext';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const CategoryService = {
  async getAllCategorys(): Promise<ICategory[]> {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  },

  async getCategoryById(id: number): Promise<ICategory> {
    const response = await axios.get(`${API_BASE_URL}/categories/${id}`);
    return response.data;
  },

  async createCategory(category: Omit<ICategory, 'id'>): Promise<ICategory> {
    const response = await axios.post(`${API_BASE_URL}/categories`, category);
    return response.data;
  },

  async updateCategory(
    id: number,
    category: Partial<ICategory>,
  ): Promise<ICategory> {
    const response = await axios.put(
      `${API_BASE_URL}/categories/${id}`,
      category,
    );
    return response.data;
  },

  async deleteCategory(id: number): Promise<void> {
    await axios.delete(`${API_BASE_URL}/categories/${id}`);
  },
};
