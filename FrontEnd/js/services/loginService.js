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
