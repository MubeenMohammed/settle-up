const API_BASE_URL = "http://10.121.78.248:8000";

export const createUser = async (user) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(user),
  });

  return response.json();
};

export const getGroupsByUserId = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/groups?user_id=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const getFriendsByUserId = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/friends?user_id=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};