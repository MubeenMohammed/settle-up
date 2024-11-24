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

export const addGroups = async (group, user_id, group_description) => {
  const userGroup = {
    group_name: group,
    description: group_description,
    created_by: user_id,
  }
  console.log(userGroup);
  console.log(JSON.stringify(userGroup));
  const response = await fetch(`${API_BASE_URL}/groups/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userGroup),
  });
  return response.json();
};


export const getFriendByEmail = async (email) => {
  const response = await fetch(`${API_BASE_URL}/find-friend?email_id=${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};  


export const addFriend = async (userId, friendId) => {
  const response = await fetch(`${API_BASE_URL}/add_friend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId, friend_id: friendId }),
  });
  return response.json();
}

export const getUserByUserId = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/user-details?user_id=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};


export const uploadBill = async (formData, groupSelected, userId) => {
  try {
    // Add additional fields to the formData
    formData.append("group_id", groupSelected);
    formData.append("user_id", userId);

    // Make the API call
    const response = await fetch(`${API_BASE_URL}/scan-bill`, {
      method: "POST",
      body: formData,
    });

    // Check if the response is okay
    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    // Parse and return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error uploading the bill:", error);
    throw error; // Rethrow the error to handle it in the caller function
  }
};