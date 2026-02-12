<<<<<<< HEAD
// Works for both localhost development and production server
// In production, set VITE_API_URL environment variable, otherwise uses localhost
const isDevelopment = !import.meta.env.VITE_API_URL;
export const BACKEND_URL = isDevelopment 
  ? 'http://localhost:3000' 
  : import.meta.env.VITE_API_URL;

// Export for backward compatibility
export const API_BASE_URL = BACKEND_URL;
=======
// Use relative paths in production (works with nginx proxy)
// Use absolute localhost URL in development
const viteApiUrl = import.meta.env.VITE_API_URL || "/api";
if (!viteApiUrl) {
  throw new Error(
    'Missing environment variable VITE_API_URL. Create makerspace-frontend/.env following the .env.example',
  );
}
export const API_BASE_URL = viteApiUrl;
>>>>>>> 3447f3e71df072fe235a564ce8a58770b03e77f7

export type Category = {
  categoryID: number;
  categoryName: string;
  units: string;
};

export type NewCategory = {
  categoryName: string;
  units: string;
};

export type InventoryItem = {
  itemID: number;
  categoryID: number;
  itemName: string;
  description?: string;
  quantity: number;
  lowThreshold: number;
  color?: string;
};

export type NewItem = {
  itemName: string;
  categoryID?: number | null;
  categoryName?: string;
  units?: string | null;
  quantity: number;
  lowThreshold: number;
  color?: string | null;
};

export type User = {
  username: string;
  hash: string;
  is_admin: boolean;
};

export type ItemTransaction = {
  transactionId: number;
  itemId: number;
  quantityChanged: number;
};

export type Transaction = {
  transactionId: number;
  transactionSystem: string;
  timestamp: Date;
};

export type NotificationRecipient = {
  email: string;
};
