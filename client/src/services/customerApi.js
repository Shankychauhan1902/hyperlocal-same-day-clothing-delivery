const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

async function request(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'The request could not be completed.');
  return payload;
}

export const getServiceability = pincode => request(`/zones/check/${encodeURIComponent(pincode)}`);
export const getProducts = ({ category } = {}) => {
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  return request(`/products${query}`);
};
