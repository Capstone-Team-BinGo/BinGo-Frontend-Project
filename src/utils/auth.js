import { ACCESS_TOKEN_KEY } from '../config';

// Ambil token dari localStorage
export function getAccessToken() {
  try {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token || token === 'null' || token === 'undefined') return null;
    return token;
  } catch (err) {
    console.error('getAccessToken error:', err);
    return null;
  }
}

// Simpan token ke localStorage
export function putAccessToken(token) {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    return true;
  } catch (err) {
    console.error('putAccessToken error:', err);
    return false;
  }
}

// Hapus token dari localStorage
export function removeAccessToken() {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    return true;
  } catch (err) {
    console.error('removeAccessToken error:', err);
    return false;
  }
}

// Logout admin: hapus token dan redirect
export function logoutAdmin() {
  removeAccessToken();
  location.href = '/admin/login'; // atau gunakan router.push jika pakai router
}

// Fungsi ini untuk memastikan hanya tamu (belum login) yang boleh akses
export function checkUnauthenticatedOnly(pageComponent) {
  const token = getAccessToken();
  if (token) {
    location.href = '/admin/manage'; // redirect kalau sudah login
    return null;
  }
  return pageComponent;
}

// Fungsi ini untuk melindungi route khusus admin
export function checkAdminAuthenticated(pageComponent) {
  const token = getAccessToken();
  if (!token) {
    location.href = '/admin/login'; // redirect kalau belum login
    return null;
  }
  return pageComponent;
}

export const putUserData = (userData) => {
  localStorage.setItem('userData', JSON.stringify(userData));
};

// Fungsi untuk mengambil data user
export const getUserData = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

// Fungsi untuk menghapus data user (bisa ditambahkan di logout)
export const removeUserData = () => {
  localStorage.removeItem('userData');
};