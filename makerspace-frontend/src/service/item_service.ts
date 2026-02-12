import axios from 'axios';
import { type InventoryItem, type NewItem, BACKEND_URL } from '../types/index';

export async function getItems(): Promise<Array<InventoryItem>> {
  const response = await axios.get(`${API_BASE_URL}/items`);

  // console.log(response.data)
  return response.data;
}

export async function getItem(id: number): Promise<InventoryItem | null> {
  try {
    const response = await axios.get(`${BACKEND_URL}/items/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching item:', error);
    return null;
  }
}

export async function postItem(item: NewItem) {
  try {
    const response = await axios.post(`${BACKEND_URL}/items`, { newItem: item });
    return response.data;
  } catch (error) {
    console.error('Error posting item:', error);
    throw error;
  }
}
