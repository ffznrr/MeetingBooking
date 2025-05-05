const URL = "http://localhost:3000";

export const fetchRoom = async (token) => {
  const response = await fetch(`${URL}/viewroom`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message || "Failed to fetch room data");
  }

  return response.json();
};

export const fetchRoomDetail = async (id, token) => {
  const response = await fetch(`${URL}/viewroomdetail/${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch room data");
  }

  return response.json();
};

export const PostBooking = async (obj) => {
  const { token } = obj;
  const response = await fetch(`${URL}/createbooking`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch room data");
  }

  return response.json();
};
