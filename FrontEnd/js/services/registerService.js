import { API_URL } from "../config.js";

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
