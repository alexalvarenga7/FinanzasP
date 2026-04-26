const BASE_URL = 'http://localhost:3000/api';

export const getTransacciones = async () => {
  const res = await fetch(`${BASE_URL}/transacciones`);
  return res.json();
};

export const crearTransaccion = async (data) => {
  const res = await fetch(`${BASE_URL}/transacciones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const eliminarTransaccion = async (id) => {
  const res = await fetch(`${BASE_URL}/transacciones/${id}`, { method: 'DELETE' });
  return res.json();
};

export const editarTransaccion = async (id, data) => {
  const res = await fetch(`${BASE_URL}/transacciones/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};