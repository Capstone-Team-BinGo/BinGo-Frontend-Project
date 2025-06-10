import { getAccessToken } from "../utils/auth";
import { BASE_URL } from "../config";

const ENDPOINTS = {
  // Auth
  REGISTER: `${BASE_URL}/api/auth/register`,
  LOGIN: `${BASE_URL}/api/auth/login`,

  // Profile
  PROFILE: `${BASE_URL}/api/user/userProfile`,

  // Public
  ARTICLE_LIST: `${BASE_URL}/api/article/articles`,
  ARTICLE_DETAIL: (article_uid) =>
    `${BASE_URL}/api/article/articles/${article_uid}`,

  // Author
  NEW_ARTICLE: `${BASE_URL}/api/article/articles`,
  UPDATE_ARTICLE: (article_uid) =>
    `${BASE_URL}/api/article/articles/${article_uid}`,
  DELETE_ARTICLE: (article_uid) =>
    `${BASE_URL}/api/article/articles/${article_uid}`,

  //Scan or Analyze
  UNAUTH_USER: `${BASE_URL}/api/analyze`,
  AUTH_USER: `${BASE_URL}/api/analyze`,
};

export async function getRegistered({ nama_lengkap, email, password }) {
  const data = JSON.stringify({ nama_lengkap, email, password });

  const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getLogin({ email, password }) {
  const response = await fetch(ENDPOINTS.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  // Pastikan struktur respons konsisten
  return {
    ok: response.ok,
    token: data.data?.token || data.token, // Handle kedua struktur
    data: data.data || data, // Simpan semua data
    message: data.message || ''
  };
}

export async function getUserProfile() {
  const token = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.PROFILE, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getAllArticles() {
  const fetchResponse = await fetch(ENDPOINTS.ARTICLE_LIST, {});

  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getDetailArticles(article_uid) {
  const fetchResponse = await fetch(ENDPOINTS.ARTICLE_DETAIL(article_uid));

  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function addNewArticle({ judul_article, description, image_thumb, file }) {
  const token = getAccessToken();

  let fetchResponse;

  // Jika `file` tersedia, pakai FormData
  if (file) {
    const formData = new FormData();
    formData.append("judul_article", judul_article);
    formData.append("description", description);
    formData.append("image_thumb", file); // Ini akan dikirim sebagai file

    fetchResponse = await fetch(ENDPOINTS.NEW_ARTICLE, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
        // Jangan set Content-Type saat pakai FormData, browser akan set otomatis
      },
      body: formData,
    });
  } else {
    // Jika gambar pakai URL
    const data = JSON.stringify({ judul_article, description, image_thumb });

    fetchResponse = await fetch(ENDPOINTS.NEW_ARTICLE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
  }

  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}


export async function updateArticle({
  article_uid,
  judul_article,
  description,
  image_thumb,
}) {
  const token = getAccessToken();
  const data = JSON.stringify({ judul_article, description, image_thumb });

  const fetchResponse = await fetch(ENDPOINTS.UPDATE_ARTICLE(article_uid), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function deleteArticle({ article_uid }) {
  const token = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.DELETE_ARTICLE(article_uid), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}
