const API_BASE_URL = "http://10.121.78.248:8000";

export const createUser = async (user) => {
  const response = await fetch(`${API_BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return response.json();
};
