import { API_URL } from "../config.js";

export async function login(username, password) {
  const response = await fetch(`${API_URL}/auth/login.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  const data = await response.json();
  return data;
}

export async function logout() {
  const response = await fetch(`${API_URL}/auth/logout.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}

export async function register(username, email, password) {
  const response = await fetch(`${API_URL}/auth/register.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
    }),
  });

  const data = await response.json();
  return data;
}

export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/auth/getUser.php`);
  const data = await response.json();
  return data || null;
}
